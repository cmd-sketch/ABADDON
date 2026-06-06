import { Events } from "discord.js";
import pool from "../database/pool.js";
import botConfig from "../config/bot.js";

export default {
  name: Events.MessageReactionRemove,

    async execute(reaction, user) {
        if (!botConfig.features.reactionRoles) return;
            if (user.bot) return;

                try {
                      if (reaction.partial) await reaction.fetch();
                            if (reaction.message.partial) await reaction.message.fetch();

                                  const emoji = reaction.emoji.id
                                          ? `<:${reaction.emoji.name}:${reaction.emoji.id}>`
                                                  : reaction.emoji.name;

                                                        const result = await pool.query(
                                                                `SELECT role_id FROM reaction_roles 
                                                                         WHERE guild_id = $1 AND message_id = $2 AND emoji = $3`,
                                                                                 [reaction.message.guild.id, reaction.message.id, emoji]
                                                                                       );

                                                                                             if (!result.rows.length) return;

                                                                                                   const roleId = result.rows[0].role_id;
                                                                                                         const member = await reaction.message.guild.members.fetch(user.id);

                                                                                                               await member.roles.remove(roleId);
                                                                                                                   } catch (err) {
                                                                                                                         console.error("Reaction role remove error:", err);
                                                                                                                             }
                                                                                                                               },
                                                                                                                               };