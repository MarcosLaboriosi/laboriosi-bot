import { EmbedBuilder } from 'discord.js';

export default (username: string, channel: string) =>
  new EmbedBuilder()
    .setTitle('🔴 Live no ar!')
    .setColor('#2ECC71')
    .setDescription(
      [
        `${username} acabou de abrir live!`,
        '',
        `[twitch.tv/${channel}](https://twitch.tv/${channel})`,
      ].join('\n')
    )
    .setTimestamp()
    .setFooter({ text: 'EntraNaCall' });
