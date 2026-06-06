import { Events } from "discord.js";
import pool from "../../database/pool.js";
import config from "../../config/bot.js";

export function loadReactionRoles(client) {
  if (!config.features.reactionRoles) return;

    client.on(Events.MessageReactionAdd, async (reaction, user) => {
        if (user.bot) return;

            if (reaction.partial) await reaction.fetch();
                if (reaction.message.partial) await reaction.message.fetch();

                    const emoji = reaction.emoji.id
                          ? `<:${reaction.emoji.name}:${reaction.emoji.id}>`
                                : reaction.emoji.name;

                                    const res = await pool.query(
                                          `SELECT role_id FROM reaction_roles
                                                 WHERE guild_id=$1 AND message_id=$2 AND emoji=$3`,
                                                       [reaction.message.guild.id, reaction.message.id, emoji]
                                                           );

                                                               if (!res.rows.length) return;

                                                                   const member = await reaction.message.guild.members.fetch(user.id);
                                                                       await member.roles.add(res.rows[0].role_id).catch(() => {});
                                                                         });

                                                                           client.on(Events.MessageReactionRemove, async (reaction, user) => {
                                                                               if (user.bot) return;

                                                                                   if (reaction.partial) await reaction.fetch();
                                                                                       if (reaction.message.partial) await reaction.message.fetch();

                                                                                           const emoji = reaction.emoji.id
                                                                                                 ? `<:${reaction.emoji.name}:${reaction.emoji.id}>`
                                                                                                       : reaction.emoji.name;

                                                                                                           const res = await pool.query(
                                                                                                                 `SELECT role_id FROM reaction_roles
                                                                                                                        WHERE guild_id=$1 AND message_id=$2 AND emoji=$3`,
                                                                                                                              [reaction.message.guild.id, reaction.message.id, emoji]
                                                                                                                                  );

                                                                                                                                      if (!res.rows.length) return;

                                                                                                                                          const member = await reaction.message.guild.members.fetch(user.id);
                                                                                                                                              await member.roles.remove(res.rows[0].role_id).catch(() => {});
                                                                                                                                                });
                                                                                                                                                }