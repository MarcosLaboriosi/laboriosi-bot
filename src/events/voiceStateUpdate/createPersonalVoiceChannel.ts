import { ChannelType } from "@types";
import { PermissionsBitField, VoiceState } from "discord.js";
import { getRandomEmoji, sanitizeToTextPattern } from "@utils";

const {
  CREATE_CHANNEL_VOICE_CHANNEL_ID: createChannelVoiceChannelId,
  CREATE_CHANNEL_CATEGORY_ID: createChannelCategoryId,
  MEMBER_ROLE_ID: memberRoleId,
} = process.env;

export async function createPersonalVoiceChannel(
  oldState: VoiceState,
  newState: VoiceState
) {
  try {
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
        name: `${randomEmoji}｜sala do ${creatorName}`,
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

      await creator.voice.setChannel(createdChannel.id);
    }
  } catch (error) {
    console.log(error);
  }
}
