const delay = require("delay");
const { EmbedBuilder , ButtonBuilder , ActionRowBuilder , ButtonStyle } = require("discord.js");
const VanillaClientEvent = require("../../structures/Eventhandler");

class PlayerEmpty extends VanillaClientEvent{
    get name(){
        return 'playerEmpty';
    }
    async run(player){
        let db = await this.client.data.get(`${player.guildId}-autoPlay`);
        if(!db || db === null) this.client.data.set(`${player.guildId}-autoPlay`,`disbaled`);
        if(db === `enabled`)
        {
           let identifier = await player.data.get(`autoplay`);
           const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
           let result = await player.search(search,{requester : this.client.user});
           player.queue.add(result.tracks[Math.floor(Math.random() * result.tracks.length)]);
           player.play();
        }
        if(db === `disabled`){
            let ch = this.client.channels.cache.get(player.textId);
        let guild = this.client.guilds.cache.get(player.guildId);
        let em = new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Queue Concluded` , iconURL : guild.iconURL({dynamic : true})});
        let but1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://top.gg/bot/946638851563225099/vote`).setLabel(`Vote`);
        let row = new ActionRowBuilder().addComponents(but1);
        ch.send({embeds : [em],});
        }
    }
}
module.exports = PlayerEmpty;