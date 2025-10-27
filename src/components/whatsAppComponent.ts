import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setLabel("Acessar Grupo")
    .setStyle(ButtonStyle.Link)
    .setEmoji("🟢")
    .setURL("https://chat.whatsapp.com/IDYL488WwdxB9xSOCUrOfM?mode=wwt")
);
