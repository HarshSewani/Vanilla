const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");

class Ban extends VanillaCommand{
    get name(){
        return 'ban';
    }
    get aliases(){
        return ['fuckban']
    }
    get cat(){
        return 'utility';
    }
    async run(client,message,args,prefix){
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    
    if(!args[0]) return message.reply(`Please mention someone to ban`)
    
    if(!target) return message.reply(`I can't find that member`)
    
    
    if(target.id === message.author.id) return message.reply(`I can't ban you as you are the Boss`)
    
    if(target.bannable) {
      const embed = new EmbedBuilder()
        .setDescription(`Banned \`${target}\` for \`${reason || "No Reason Provided"}\``)
        .setColor(client.config.color)
      return message.reply({ embeds: [embed] });
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply(`I can't ban them, make sure that I have Enough Permissions To ban Them`)
    }
    return undefined
  }
};
module.exports = Ban;