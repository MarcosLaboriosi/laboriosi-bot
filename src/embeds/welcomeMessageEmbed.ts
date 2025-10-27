import { EmbedBuilder } from "discord.js";

export default (username: string, avatarURL: string) =>
  new EmbedBuilder()
    .setTitle(`🎉 Bem-vindo(a), ${username}!`)
    .setDescription(`Estamos felizes por ter você aqui!`)
    .setColor("#00BFFF")
    .setThumbnail(avatarURL)
    .setTimestamp();
