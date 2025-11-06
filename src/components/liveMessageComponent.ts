import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default (url: string) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Assitir')
      .setStyle(ButtonStyle.Link)
      .setURL(url),
    new ButtonBuilder()
      .setLabel('Follow')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('follow')
      .setEmoji('🔔')
  );
