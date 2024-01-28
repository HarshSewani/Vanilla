const { Collection , ButtonBuilder , ActionRowBuilder , ButtonStyle , EmbedBuilder, PermissionsBitField , WebhookClient } = require('discord.js');
const EventEmitter = require('events');
const { afk } = require("../utils/afk");
const { readdirSync } = require('fs');
const web = new WebhookClient({url : `https://discord.com/api/webhooks/1106408546347782354/723pQPobFKeuCkiJ15pm6O3dRItk94IW-YLvK7krSs4f3Tr0nLj_PI7q_uDqze0tBtAn`});
const ascii = require(`ascii-table`);
const moment = require("moment");
const config = require(`../../config.json`);
const table = new ascii().setHeading('Vanilla Commands','Status');
const top = require(`@top-gg/sdk`);
const vote = new top.Api(config.topggapi);
class VanillaCommands extends EventEmitter {
    constructor(client){
        super();
        this.client = client;
        this.commands = new Collection();
        this.load = false;
        this.on("error",async(err) => {console.error(err)});
        this.client.on('messageCreate',(message) => this.run(message));
    }
    loadCommands(){
        if(this.load) return this;
        readdirSync(`./src/commands/`).forEach(d => {
            const commands = readdirSync(`./src/commands/${d}/`).filter(f => f.endsWith('.js'));
            for(const cmd of commands){
                const VanillaCommand = require(`${process.cwd()}/src/commands/${d}/${cmd}`);
                const command = new VanillaCommand(this.client);
                this.commands.set(command.name,command);
                table.addRow(command.name,'✅');
            }
        });
        console.log(table.toString());
        this.load = true;
        return this;
    }
    
    async run(message){
        if(!message.guild || message.author.bot || message.attachments.size || message.stickers.size) return;
        let prefix;
        let data = await this.client.data.get(`${message.guild.id}-prefix`);
        if(data) prefix = data; else prefix = this.client.config.prefix;

        if(message.content === `<@${this.client.user.id}>`)
        {
            let b1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Invite`).setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=415602886720&scope=bot`);
            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Support`).setURL(this.client.config.server);
            let b3 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/946638851563225099/vote`);
            let ro = new ActionRowBuilder().addComponents(b1,b2,b3);
            let embed = new EmbedBuilder().setColor(client.config.color)
            .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setFooter({text: 'Love From _devil_xd. <3'})
            .setDescription(`Hey **${message.author.username}**, My Prefix For This Server Is \`${prefix}\`\nIf You Want More Info, Then Do \`${prefix}\`**help**`);
            return message.channel.send({embeds : [embed],components : [ro]}).catch((e) => { message.author.send({content : `Error while sending message there : ${e.message}`}).catch(() => {}) })
        }
        if (message.author.bot) return;
        const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);
    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();
      message.reply(
        `<@${mentionedMember.user.id}> is currently afk (${timeAgo}) - \`${reason}\``
      );
    }
  }
  const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    message.reply(`Welcome Back <@${message.author.id}>, I have removed your AFK `);
  }
        
        try{
        let np = ['921602447754031175',];
        let regex = RegExp(`^<@!?${this.client.user.id}>`);
        let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
        let db = await this.client.data2.get(`noprefix_${message.guild.id}`);
        let db2 = await this.client.data2.get(`noprefix_${this.client.user.id}`);
        if(!db2 || db2 === null) await this.client.data2.set(`noprefix_${this.client.user.id}`,[]);
        let pun = [];
        db2.forEach(x => pun.push(x));
        pun.forEach(punit => np.push(punit));
        if(!db || db === null) await this.client.data2.set(`noprefix_${message.guild.id}`,[]);
        let ooo = []
        db.forEach(x => ooo.push(x));
        ooo.forEach(x => np.push(x));
        if(!np.includes(message.author.id)){ if(!message.content.startsWith(pre)) return;}
        const args = np.includes(message.author.id) == false ? message.content.slice(pre.length).trim().split(/ +/) :  message.content.startsWith(pre) == true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const VanillaCommand = this.commands.get(commandName) || this.commands.find((c) => c.aliases && c.aliases.includes(commandName));
        if(!VanillaCommand) return;
        const em = new EmbedBuilder().setAuthor({name : `| Command Runned`,iconURL : message.author.displayAvatarURL({dynamic : true})})
                .setDescription(
                    `**Author name :** ${message.author.tag}
                    **Guild name :** ${message.guild.name}
                    **Guild Id :** ${message.guild.id}
                    **Command ran :** \`${VanillaCommand.name}\`
                    **Channel name :** ${message.channel.name}
                    **Channel :** <#${message.channel.id}>`
                    ).setThumbnail(message.guild.iconURL({dynamic : true}));
        web.send({embeds : [em]});
        
            // if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.ViewChannel)) return;
            // if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) return message.author.send({content : `I dont have **Send Messages** Permissions in that channel`}).catch(e => null);
            // if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.ReadMessageHistory)) return message.channel.send({content : `I don't have **Read Message History Permissions** here`});
            // if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.UseExternalEmojis)) return message.channel.send({content : `I don't have **Use External Emojis** Permissions here`})
            // if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.EmbedLinks)) return message.channel.send({content : `I don't have **Embed Links** Permissions here`})
        let client = this.client;
        if(VanillaCommand.inVoice){
            if(message.guild.members.me.voice.channel && !message.member.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to a voice channel.`)]})
            }
        }
        if(VanillaCommand.sameVoice){
            if(message.guild.members.me.voice.channelId !== message.member.voice.channelId && message.guild.members.me.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to ${message.guild.members.me.voice.channel}`)]})
            }
        }
        if(VanillaCommand.vote)
        {
            let voted = await vote.hasVoted(message.author.id);
            if(!voted && !this.client.config.owners.includes(message.author.id)){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(config.color).setDescription(`${this.client.emoji.tick} | [Vote](https://top.gg/bot/946638851563225099/vote) Required Click [here](https://top.gg/bot/946638851563225099/vote)`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/946638851563225099/vote`))]})
            }
        }
        let player = client.poru.players.get(message.guild.id);
        if(VanillaCommand.player){
            if(!player || !player.queue.current){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I am not playing Anything` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
        }
        
        VanillaCommand.run(client,message,args,prefix,player).catch(() => { });
        } catch(e) { console.error(e) } 
    }
}
module.exports = VanillaCommands;