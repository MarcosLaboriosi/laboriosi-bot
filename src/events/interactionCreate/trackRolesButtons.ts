import { ButtonInteraction, Guild } from "@types";

const {
  HEALER_ROLE_ID: healerRoleId,
  TANK_ROLE_ID: tankRoleId,
  DPS_ROLE_ID: dpsRoleId,
} = process.env;

const ROLE_IDS = {
  healer: healerRoleId,
  dps: dpsRoleId,
  tank: tankRoleId,
} as const;

async function toggleGuildMemberRole(
  guild: Guild,
  userId: string,
  roleId: string
) {
  const member = await guild.members.fetch(userId);
  const hasRole = member.roles.cache.has(roleId);

  if (hasRole) {
    await member.roles.remove(roleId);
  } else {
    await member.roles.add(roleId);
  }
}

export async function trackRolesButtons(interaction: ButtonInteraction) {
  const roleId = ROLE_IDS[interaction.customId as keyof typeof ROLE_IDS];

  if (!interaction.guild) return;
  if (!roleId) return;

  await interaction.deferUpdate();

  try {
    await toggleGuildMemberRole(interaction.guild, interaction.user.id, roleId);
  } catch (error) {
    console.error(
      `Erro ao alternar role (${roleId}) para user ${interaction.user.id}:`,
      error
    );
  }
}
