import { EmbedBuilder } from 'discord.js';

export default (
  username: string,
  url: string,
  iconURL: string,
  title: string
) =>
  new EmbedBuilder()
    .setTitle(`🟣 ${username} acabou de abrir live!`)
    .setAuthor({ name: username, iconURL })
    .setColor('#9146FF')
    .setDescription([title, '', `${url}`].join('\n'))
    .setTimestamp()
    .setFooter({ text: 'EntraNaCall' });
