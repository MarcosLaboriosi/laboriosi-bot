import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default (channel: string) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Assitir')
      .setStyle(ButtonStyle.Link)
      .setURL(`https://twitch.tv/${channel}`),
    new ButtonBuilder()
      .setLabel('Follow')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('follow')
      .setEmoji('🔔')
  );
