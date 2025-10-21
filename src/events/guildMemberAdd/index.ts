import { GuildMember } from "@types";

const { MEMBER_ROLE_ID: memberRoleId, GUILD_ID: guildId } = process.env;

export default async (member: GuildMember) => {
  try {
    if (member.guild.id === guildId) member.roles.add(memberRoleId);
  } catch (error) {
    console.log(error);
  }
};
