const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'This command mutes a member!',
    execute(client, message, args, cmd, Discord){
        if(message.member.roles.cache.has('732193417311813663')){
            const target = message.mentions.users.first();
        if (target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            
            let memberTarget = message.guild.members.cache.get(target.id);

            if(!args[1]){
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return
            }                              
            
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function(){
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);                                    
            }, ms(args[1]));
        }else{
            message.channel.send('🔇 Please specify a member to mute');
        }
        }else{
            message.channel.send('You can not use this command because you do not have the right permissions');
        }
        
    }
}

