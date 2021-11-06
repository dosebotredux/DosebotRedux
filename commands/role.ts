import Discord from 'discord.js';

import * as roles from '../include/roles';

async function assignNickname(guild: Discord.Guild, user: Discord.GuildMember, substance: string | null, dosage: string | null) {
  if (!guild.me?.permissions.has('MANAGE_NICKNAMES')) {
    console.log("Not setting nickname, don't have permission");
  }

  if (substance && dosage) {
    await user.setNickname(`${user.displayName} | ${substance} ${dosage}`);
  } else if (substance) {
    await user.setNickname(`${user.displayName} | ${substance}`);
  }
}

async function restoreNickname(guild: Discord.Guild, user: Discord.GuildMember) {
  if (!guild.me?.permissions.has('MANAGE_NICKNAMES')) {
    console.log("Not setting nickname, don't have permission");
  }

  if (user.displayName.includes('|')) {
    const nickTokens = user.displayName.split('|');
    await user.setNickname(nickTokens[0]);
  }
}

async function assignRole(guild: Discord.Guild, user: Discord.GuildMember, roleToApply: Discord.Role, substance: string | null, dosage: string | null, isPermanent: boolean) {
  await user.roles.add(roleToApply).then(() => {
    return assignNickname(guild, user, substance, dosage).catch(console.error);
  }).then(() => {
    if (!isPermanent) {
      new Promise((resolve) => {
        console.log("Unassigning role in 8 hours.")
        setTimeout(resolve, 8 * 60 * 60 * 1000);
      }).then(() => {
        return unassignRole(guild, user, roleToApply);
      }).catch(console.error);
      return null;
    }
  });
}

async function unassignRole(guild: Discord.Guild, user: Discord.GuildMember, roleToApply: Discord.Role) {
  await user.roles.remove(roleToApply).then(() => {
    return restoreNickname(guild, user).catch(console.error);
  });
}

async function toggleRole(message: Discord.Message, guild: Discord.Guild, user: Discord.GuildMember, roleToSet: Discord.Role, substance: string | null, dosage: string | null, isPermanent: boolean) {
  if (user.roles.cache.find(role => role.name == roleToSet.name)) {
    // User already has role -- unset
    await unassignRole(guild, user, roleToSet).then(() => {
      return message.reply(`Removed **${roleToSet.name}** from <@${user.id}>`);
    });
  } else {
    // User does not have role -- set
    await assignRole(guild, user, roleToSet, substance, dosage, isPermanent).then(() => {
      return message.reply(`Added **${roleToSet.name}** to <@${user.id}>`);
    });
  }
}

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  if (!(message.channel instanceof Discord.TextChannel)) {
    console.log("attempting to toggle role in non-textchannel");
    return;
  }

  const tokens = message.content.split(" ");
  tokens.shift();
  const roleName = tokens[0].toLowerCase().replace(/[\W_]+/g,"");

  if (!(roles.temporaryRoles.includes(roleName) || roles.permanentRoles.includes(roleName))) {
    console.log(`Not a valid role: roleName`)
    return
  }

  const substance = (tokens.length >= 2) ? tokens[1] : null;
  const dosage = (tokens.length >= 3) ? tokens[2] : null;

  // Checks to see if the desiredRole is equal to any role object's name property
  const roleToSet = message.channel.guild.roles.cache.find(role => role.name.toLowerCase().replace(/[\W_]+/g,"") == roleName)
  if (!roleToSet) {
    message.channel.send('Error: That role does not does not exist on this server.');
    return;
  }

  const member = message.member;
  if (!member) {
    message.reply("It appears you're not a member of this guild.");
    return;
  }

  // Now that we have the desired guild role snowflake we can check if its temporary or permanent
  const isPermanent = roles.permanentRoles.includes(roleName);
  toggleRole(message, message.channel.guild, member, roleToSet, substance, dosage, isPermanent);
}
