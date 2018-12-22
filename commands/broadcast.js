const Discord           = require('discord.js');
const config            = require('../config.json');
const prefix            = config.local.prefix;

const log = (msg) => { console.log(msg) }

module.exports = {
    help: {
        name:         "broadcast",
        aliases:      ['bc']
    },
    run: async (bot, msg, args) => {
        if(!msg.member.hasPermission('ADMINISTRATOR')) return bot.error(msg.channel, "Whoops!", "You don't meet the requirements to use this command!")
        let message     = args.join(' ');
        if(!message) return bot.error(msg.channel, "Invaild arguments!", `Please type the message you want to broadcast after the command.`);
        if(message.length > 2000) return bot.error(msg.channel, "Whoops!", 'Message length cannot be longer than 2000 characters.');
        
        let a = 0;
        let b = 0;
        let c = 0;
        let m = `Successfully sent to ${a}, failed to sent to ${b}, totally ${c}`;
        msg.channel.send(m).then(m2 => {
            msg.guild.members.forEach(member => {
                member.send(message).then(x => {
                    c++;
                    a++;
                }).catch(er => {
                    a++;
                    b++;
                });
                if(c == msg.guild.memberCount || c == msg.guild.members.size) m2.edit(`**Done**\n**Successfully sent to ${a}, failed to sent to ${b}, totally ${c}**`);
                else m2.edit(`**Successfully sent to ${a}, failed to sent to ${b}, totally ${c}**`);
            });
        });
    }
}