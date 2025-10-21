export * from "discord.js";

export type { Interaction, NonThreadGuildBasedChannel } from "discord.js";

export interface UserInfo {
  name?: string;
  cellphone?: string;
  battleTag?: string;
  timeOfDay?: string[];
}
