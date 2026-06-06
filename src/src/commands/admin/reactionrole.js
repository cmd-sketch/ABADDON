import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("reactionrole")
    .setDescription("Setup reaction roles (placeholder)")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

      export async function execute(interaction) {
        await interaction.reply({
            content: "Reaction role command exists, but setup logic is not wired yet.",
                ephemeral: true,
                  });
                  }