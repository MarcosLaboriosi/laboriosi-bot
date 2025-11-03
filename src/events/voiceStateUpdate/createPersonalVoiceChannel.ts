import { ChannelType } from '@types';
import { PermissionsBitField, VoiceState, REST } from 'discord.js';
import { getRandomEmoji, sanitizeToTextPattern } from '@utils';
import streamers from '@/constants/streamers';
import { liveMessageEmbed } from '@/embeds';
import { liveMessageComponent } from '@/components';

const {
  CREATE_CHANNEL_VOICE_CHANNEL_ID: createChannelVoiceChannelId,
  CREATE_CHANNEL_CATEGORY_ID: createChannelCategoryId,
  MEMBER_ROLE_ID: memberRoleId,
  SOCIAL_CHAT_CHANNEL_ID: socialChatChannelId,
  FOLLOWER_ROLE_ID: followerRoleId,
  DISCORD_TOKEN: discordToken,
} = process.env;

export async function createPersonalVoiceChannel(
  oldState: VoiceState,
  newState: VoiceState
) {
  try {
    const memberId = newState?.member?.id;
    const guild = newState.guild;
    const streamer = streamers.find((streamer) => streamer.id === memberId);
    const socialChannel = guild.channels.cache.get(socialChatChannelId);

    const isJoiningCreateChannelVoiceChannel =
      newState.channelId === createChannelVoiceChannelId;

    const isLastMemberLeavingTemporaryChannel =
      oldState.channelId !== createChannelVoiceChannelId &&
      oldState.channel?.parent?.id === createChannelCategoryId &&
      oldState.channel?.members.size === 0;

    if (isLastMemberLeavingTemporaryChannel) {
      await oldState.channel.delete();
    }

    if (
      isJoiningCreateChannelVoiceChannel &&
      newState.channel &&
      newState.member
    ) {
      const creator = newState.member;
      const randomEmoji = getRandomEmoji();
      const creatorName = sanitizeToTextPattern(creator.displayName);

      const createdChannel = await newState.guild.channels.create({
        name: `${streamer ? '🟣' : randomEmoji}｜${
          streamer ? 'live' : 'sala'
        } do ${creatorName}`,
        type: ChannelType.GuildVoice,
        parent: newState.channel.parent,
        permissionOverwrites: [
          {
            id: creator.id,
            allow: [
              PermissionsBitField.Flags.MoveMembers,
              PermissionsBitField.Flags.ManageChannels,
              PermissionsBitField.Flags.UseExternalSounds,
              PermissionsBitField.Flags.UseSoundboard,
            ],
          },
          { id: memberRoleId, allow: [PermissionsBitField.Default] },
          {
            id: newState.guild.roles.everyone,
            deny: [PermissionsBitField.All],
          },
        ],
      });

      if (
        isJoiningCreateChannelVoiceChannel &&
        newState.channel &&
        newState.member &&
        streamer
      ) {
        const rest = new REST({ version: '10' }).setToken(discordToken);
        await rest.put(`/channels/${createdChannel.id}/voice-status`, {
          body: { status: `Live on twitch.tv/${streamer.channel}` },
        });
        if (socialChannel && socialChannel.isTextBased()) {
          await socialChannel.send({
            content: `<@&${followerRoleId}>`,
            embeds: [
              liveMessageEmbed(newState.member.displayName, streamer.channel),
            ],
            components: [liveMessageComponent(streamer.channel)],
          });
        }
      }

      await creator.voice.setChannel(createdChannel.id);
    }
  } catch (error) {
    console.log(error);
  }
}
