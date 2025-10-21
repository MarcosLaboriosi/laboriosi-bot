import { Interaction } from "discord.js";
import { trackRolesButtons } from "./trackRolesButtons";

export default async (interaction: Interaction) => {
  try {
    if (interaction.isButton() && interaction.guild) {
      await trackRolesButtons(interaction);
    }
  } catch (error) {
    console.log(error);
  }
};
