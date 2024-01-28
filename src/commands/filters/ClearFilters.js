const VanillaCommand = require("../../structures/VanillaCommand");
const { EmbedBuilder } = require(`discord.js`);
class clearFilters extends VanillaCommand{
    get name(){
        return 'rotation'
    }
    get aliases(){
        return null;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'filters'
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.send({guildId : message.guild.id,op : 'filters'});
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Cleared all the filters mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = clearFilters;