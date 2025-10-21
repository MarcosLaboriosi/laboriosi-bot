import {
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} from "@types";
import client from "@core/client";
import rolesOptionsComponent from "@components/rolesOptionsComponent";
import { rolesEmbed, guildRulesEmbed } from "@embeds";

const { ROLES_CHANNEL_ID: rolesChannelId, RULES_CHANNEL_ID: rulesChannelId } =
  process.env;

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
  fetchTextChannelAndFixMessage(
    rolesChannelId,
    rolesEmbed,
    rolesOptionsComponent
  );

  fetchTextChannelAndFixMessage(rulesChannelId, guildRulesEmbed);
};
