import welcomeMessageEmbed from "@/embeds/welcomeMessageEmbed";
import { EmbedBuilder, GuildMember } from "@types";

const { WELCOME_CHANNEL_ID } = process.env;

export default async (member: GuildMember) => {
  const avatarURL = member.user.displayAvatarURL({ size: 1024 });
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

  if (!channel || !channel.isTextBased()) return;

  const embed = welcomeMessageEmbed(member.user.username, avatarURL);

  channel.send({ embeds: [embed] });
};
