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
                c++;
                member.send(message).then(() => { a++ }).catch(e => { b++ });
                if(c == Math.round(msg.guild.memberCount).toFixed() / 8) m2.edit(m);
                else if(c == Math.round(msg.guild.memberCount).toFixed() / 5) m2.edit(`Successfully sent to ${a}, failed to sent to ${b}, totally ${c}`);
                else if(c == Math.round(msg.guild.memberCount).toFixed() / 3) m2.edit(`Successfully sent to ${a}, failed to sent to ${b}, totally ${c}`);
                else if(c == Math.round(msg.guild.memberCount).toFixed() / 2) m2.edit(`Successfully sent to ${a}, failed to sent to ${b}, totally ${c}`);
                else if(c == Math.round(msg.guild.memberCount).toFixed()) m2.edit(`__**Done!**__\n` + `Successfully sent to ${a}, failed to sent to ${b}, totally ${c}`);
            });
        });
    }
}