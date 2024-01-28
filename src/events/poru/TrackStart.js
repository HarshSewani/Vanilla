const { EmbedBuilder, ButtonBuilder, AttachmentBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const VanillaClientEvent = require(`../../structures/Eventhandler`);
const { musicCard } = require("musicard");
const fs = require("fs");
const moment = require(`moment`);
require(`moment-duration-format`);
class TrackStart extends VanillaClientEvent{
    get name(){
        return 'playerStart'
    }
    async run(player,track){
        player.data.set(`autoplay`,track.identifier);
        let url = track.uri;
        if(url.includes("youtube.com"))
        {
            url = this.client.config.server
        }
        
  let author = track.author
  let album = track.title
  let image = `${track.thumbnail ? track.thumbnail : `https://img.youtube.com/track/${track.identifier}/maxresdefault.jpg`}`
  let requester = track.requester
  
  const card = new musicCard()
        .setName(album)
        .setAuthor(author)
        .setColor("auto") // or hex color without # (default: auto) (auto: dominant color from thumbnail)
        .setBrightness(50)
        .setThumbnail(image)
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime("3:00")
  const cardBuffer = await card.build();
  const imgg = new AttachmentBuilder(cardBuffer, 'playing.png');
  
        let emb = new EmbedBuilder().setColor(this.client.config.color).setDescription(`[${track.title}](${track.uri})`).addFields([
            {name : `${this.client.emoji.author} __Author__` , value : `${track.author}` , inline : true},
            {name : `${this.client.emoji.users} __Requester__` , value : `[${track.requester}]`,inline : true},
            {name : `${this.client.emoji.time} __Duration__`,value : `${moment.duration(player.queue.current.length).format("hh:mm:ss")}`,inline : true}
        ]).setAuthor({name : `| Now Playing` , iconURL : this.client.user.displayAvatarURL()}).setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/maxresdefault.jpg`)
        const channel = this.client.channels.cache.get(player.textId);
        let duration = moment.duration(player.queue.current.length).format("hh:mm:ss");
        if(duration < 30)
        {
            player.skip();
            return channel.send({embeds : [
                new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.settings} I am skipping this track as its duration is less than 30 seconds`)
            ]});
        }
        let but1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8stop64:1155153104027779132>").setLabel(`Stop`).setCustomId(`pl1`);
        let but2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8pause64:1155153123359334461>").setLabel(`Pause`).setCustomId(`pl2`);
        let but3 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8repeat64:1155153078786469998>").setLabel(`Loop`).setCustomId(`pl3`);
        let but4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8previous64:1155153098503893083>").setLabel(`Previous`).setCustomId(`pl4`);
        let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8end64:1155153095844704368>").setLabel(`Skip`).setCustomId(`pl5`);
        let ro = new ActionRowBuilder().addComponents(but4,but2,but5,but3,but1);
        if(channel){
            return channel?.send({files : [imgg],components : [ro]}).then(x => player.data.set("music",x));
        }
    }
}
module.exports = TrackStart;