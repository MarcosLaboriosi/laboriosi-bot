import { ButtonInteraction, Guild } from '@types';

const { FOLLOWER_ROLE_ID: followerRoleId } = process.env;

async function toggleFollowerRole(
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

export async function trackFollowButton(interaction: ButtonInteraction) {
  if (!interaction.guild || interaction.customId !== 'follow') return;
  if (!followerRoleId) return;

  await interaction.deferUpdate();

  try {
    await toggleFollowerRole(
      interaction.guild,
      interaction.user.id,
      followerRoleId
    );
  } catch (error) {
    console.error(error);
  }
}
