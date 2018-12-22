/*
 *
 *
 * Golden Developers (c) 2018-2019
 * Made by: ImKIJ (Staff member)
 * 
 *  
 */



const Discord           = require('discord.js');
const fs                = require('fs');
const config            = require('./config.json');
const bot               = new Discord.Client();
const prefix            = config.local.prefix;

const log = (msg) => { console.log(msg) }

bot.login(process.env.TOKEN);

bot.on(`ready`, async () => {
    log(`Starting..`)
    log(`${bot.user.username} is now working..`)
    log(`Version: ${config.discord.version}`);
});

bot.error = function(channel, title, text) {
    let embed = new Discord.RichEmbed();
    embed.setColor(`#e8563c`);
    embed.setTimestamp();
    embed.setTitle(title);
    embed.setDescription(text);
    channel.send(embed);
}

bot.commands        = new Discord.Collection();
bot.aliases         = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    if(!files) return;
    log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        if(!f.endsWith(".js")) return;
        let props = require(`./commands/${f}`);
        log(`Attempting to load ${props.help.name}`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.on(`message`, async msg => {
    if(!msg.channel.guild || msg.author.bot) return;
    if(msg.content.indexOf(prefix) !== 0) return;

    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let command;

    if(bot.commands.has(cmd)){
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)){
        command = bot.commands.get(bot.aliases.get(cmd));
    }

    if(command){
        command.run(bot, msg, args);
    }
});

bot.on('ready', async () => {
    log('Logging in...')
    log(`Logged in as ${bot.user.tag}`)
    log(`Guilds Size: (${bot.guilds.size})`)
});