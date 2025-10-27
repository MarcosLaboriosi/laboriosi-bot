import { GuildMember } from "@types";
import addMemberRole from "./addMemberRole";
import welcomeMessage from "./welcomeMessage";

export default async (member: GuildMember) => {
  addMemberRole(member);
  welcomeMessage(member);
};
