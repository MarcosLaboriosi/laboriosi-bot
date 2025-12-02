import 'dotenv/config';
import axios from 'axios';
import streamers from '@/constants/streamers';
import { Client, TextChannel } from 'discord.js';
import { liveMessageEmbed } from './embeds';
import { liveMessageComponent } from './components';

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, POLL_INTERVAL_MS } =
  process.env;

let appToken: string | null = null;
let tokenExpiresAt = 0;

async function getAppToken(): Promise<string> {
  const now = Date.now();
  if (appToken && now < tokenExpiresAt - 30_000) return appToken;

  const { data } = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id: TWITCH_CLIENT_ID!,
      client_secret: TWITCH_CLIENT_SECRET!,
      grant_type: 'client_credentials',
    },
    timeout: 10_000,
  });

  appToken = data.access_token as string;
  tokenExpiresAt = now + data.expires_in * 1000;
  console.log('[Twitch] App token atualizado');
  return appToken!;
}

async function helixGet<T>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  const token = await getAppToken();
  const { data } = await axios.get(url, {
    params,
    headers: {
      'Client-ID': TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${token}`,
    },
    timeout: 10_000,
  });
  return data as T;
}

type StreamRow = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  title: string;
  type: 'live' | '';
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
  language: string;
};

type UsersRow = {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
};

const isLive = new Map<string, boolean>();
const lastNotifiedAt = new Map<string, number>();
const avatarCache = new Map<string, string>();

const MIN_NOTIFY_INTERVAL_MS = 5 * 60 * 1000;

async function fetchLiveStatus(userIds: string[]) {
  const params: Record<string, any> = {};
  userIds.forEach((id, i) => (params[`user_id`] = undefined)); // só pra type
  const url = 'https://api.twitch.tv/helix/streams';
  const { data } = await axios.get(url, {
    params: { user_id: userIds },
    headers: {
      'Client-ID': TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${await getAppToken()}`,
    },
    timeout: 10_000,
    paramsSerializer: (p) => {
      const ids = (p.user_id as string[])
        .map((v) => `user_id=${encodeURIComponent(v)}`)
        .join('&');
      return ids;
    },
  });

  const rows = (data?.data ?? []) as StreamRow[];
  const onlineById = new Map<string, StreamRow>();
  for (const r of rows) {
    if (r.type === 'live') onlineById.set(r.user_id, r);
  }
  return onlineById;
}

async function getProfileImageUrl(userId: string): Promise<string | null> {
  const cached = avatarCache.get(userId);
  if (cached) return cached;

  const data = await helixGet<{ data: UsersRow[] }>(
    'https://api.twitch.tv/helix/users',
    { id: userId }
  );
  const url = data.data?.[0]?.profile_image_url ?? null;
  if (url) avatarCache.set(userId, url);
  return url;
}

export function startTwitchPolling(discordClient: Client) {
  const userIds = streamers.map((s) => s.twitchId);

  const tick = async () => {
    try {
      const onlineMap = await fetchLiveStatus(userIds);

      for (const s of streamers) {
        const row = onlineMap.get(s.twitchId);
        const currentlyLive = !!row;
        const wasLive = isLive.get(s.twitchId) || false;

        if (currentlyLive && !wasLive) {
          const now = Date.now();
          const last = lastNotifiedAt.get(s.twitchId) || 0;
          if (now - last > MIN_NOTIFY_INTERVAL_MS) {
            const avatar = await getProfileImageUrl(s.twitchId);
            const title = row!.title || 'Está ao vivo!';
            const url = `https://twitch.tv/${s.channel}`;

            const channel = await discordClient.channels
              .fetch('1432102842411385065')
              .catch(() => null);
            if (channel && channel.isTextBased()) {
              await (channel as TextChannel).send({
                embeds: [
                  liveMessageEmbed(row!.user_name, url, avatar ?? '', title),
                ],
                components: [liveMessageComponent(url)],
              });
              console.log(
                `[Twitch] Notificação enviada: ${s.channel} — "${title}"`
              );
              lastNotifiedAt.set(s.twitchId, now);
            }
          }
        }

        isLive.set(s.twitchId, currentlyLive);
      }
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) {
        appToken = null;
        tokenExpiresAt = 0;
        console.warn(
          '[Twitch] 401 na Helix; token será renovado no próximo ciclo.'
        );
      } else if (status === 429) {
        console.warn(
          '[Twitch] 429 (rate limit). Reduza o polling ou agregue IDs.'
        );
      } else {
        console.error(
          '[Twitch] Erro no polling:',
          e?.response?.data || e?.message
        );
      }
    }
  };

  tick();

  const base = parseInt(String(POLL_INTERVAL_MS), 10) || 60000;

  setInterval(() => {
    const jitter = Math.floor(Math.random() * 3000);
    setTimeout(tick, jitter);
  }, base);
}
