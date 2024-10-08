// @ts-check // Can be removed, used to check typings and valid actions
const quick = require('quick.db');

module.exports = {
  name: 'afkset',
  aliases: ['afk'],
  description: 'Set your afk status',
  execute(client, message) {
    // check if the client can change nicknames
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('status change failed');
    // Add/update the member in the database
    quick.set(`${message.author.id}_${message.guild.id}_afk`, {
      username: message.member.displayName.replace('[AFK]', ''), // replace the AFK part of the nickname of the member is afk and uses the command again
      active: true, // Set to true so it will be passed up by the if check in the message event
      date: Date.now(), // set the data this was done
    });

    message.member
      .setNickname(`[AFK] ${message.member.displayName.replace('[AFK]', '')}`) // Make sure on the name inplacation to replace the AFk part of the name
      // reply to say status set
      .then(() => {
        return message.reply(`status has been set to afk.`);
      })
      // catch an error and then remove the member form the database and send a message
      .catch(_e => {
        quick.delete(`${message.author.id}_${message.guild.id}_afk`);
        return message.channel.send('Failed to set your status.');
      });
  },
};