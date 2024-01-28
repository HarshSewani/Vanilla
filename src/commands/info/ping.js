const VanillaCommand = require("../../structures/VanillaCommand");
const {EmbedBuilder} = require(`discord.js`);
class ping extends VanillaCommand {
    get name(){
        return 'ping'
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${client.user.username} Ping
       `}).addFields({name : `<:spy_ping:1103681178319474738> **Pong** <:spy_ping:1103681178319474738>`,value : `${client.ws.ping} ms`}).setFooter({text : `Requested By : ${message.author.tag}`}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))]});
    }
}
module.exports = ping;