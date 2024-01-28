const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");

class Avatar extends VanillaCommand{
    get name(){
        return 'avatar';
    }
    get aliases(){
        return ['av']
    }
    get cat(){
        return 'info';
    }
    async run(client,message,args,prefix){

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const mainPage = new EmbedBuilder()
      .setAuthor({ name: `${user.tag}'s Avatar`, iconURL: user.displayAvatarURL()})
      .setTimestamp()
      .setColor(client.config.color)
      .setDescription(`[\`PNG\`](${user.displayAvatarURL({
        format: "png",
        dynamic: false
      })}) | [\`JPG\`](${user.displayAvatarURL({
        format: "jpg",
        dynamic: false
      })}) | [\`GIF\`](${user.displayAvatarURL({
        format: "gif",
        dynamic: true
      })})`)
      .setImage(user.displayAvatarURL({dynamic:true, size:4096}))
      
    
    message.reply({ embeds: [mainPage] })
  }
}
module.exports = Avatar;