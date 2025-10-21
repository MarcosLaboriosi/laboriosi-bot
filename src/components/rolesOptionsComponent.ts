import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("dps")
    .setLabel("DPS")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("🗡️"),
  new ButtonBuilder()
    .setCustomId("tank")
    .setLabel("Tank")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("🛡️"),
  new ButtonBuilder()
    .setCustomId("healer")
    .setLabel("Healer")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("✨")
);
