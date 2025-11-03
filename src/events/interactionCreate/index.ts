import { Interaction } from 'discord.js';
import { trackRolesButtons } from './trackRolesButtons';
import { trackFollowButton } from './trackFollowButton';

export default async (interaction: Interaction) => {
  try {
    if (interaction.isButton() && interaction.guild) {
      await trackRolesButtons(interaction);
      await trackFollowButton(interaction);
    }
  } catch (error) {
    console.log(error);
  }
};
