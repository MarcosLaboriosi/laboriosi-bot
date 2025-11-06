import {
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} from '@types';
import client from '@core/client';
import { rolesOptionsComponent, WhatsAppComponent } from '@components';
import { rolesEmbed, guildRulesEmbed, whatsAppLinkEmbed } from '@embeds';
import { startTwitchPolling } from '@/twitchPoller';

const {
  ROLES_CHANNEL_ID: rolesChannelId,
  RULES_CHANNEL_ID: rulesChannelId,
  WHATSAPP_CHANNEL_ID: whatsAppChannelId,
} = process.env;

const fetchTextChannelAndFixMessage = async (
  channelId: string,
  embed: EmbedBuilder,
  component?: ActionRowBuilder<ButtonBuilder>
) => {
  const channel = await client.channels.fetch(channelId);
  const isTextChannel = channel?.type === ChannelType.GuildText;

  if (isTextChannel) {
    const messages = await channel.messages.fetch();
    const lastMessage = messages.last();

    if (lastMessage) {
      await lastMessage.fetch();
    } else {
      await channel.send({
        embeds: [embed],
        components: component ? [component] : [],
      });
    }
  }
};

export default async () => {
  startTwitchPolling(client);

  fetchTextChannelAndFixMessage(
    rolesChannelId,
    rolesEmbed,
    rolesOptionsComponent
  );

  fetchTextChannelAndFixMessage(rulesChannelId, guildRulesEmbed);

  fetchTextChannelAndFixMessage(
    whatsAppChannelId,
    whatsAppLinkEmbed,
    WhatsAppComponent
  );
};
