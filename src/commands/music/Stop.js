const { EmbedBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand")

class Stop extends VanillaCommand{
    get name(){
        return 'stop';
    }
    get aliases(){
        return ['st'];
    }
    get player(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.destroy();
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Destroyed the player` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = Stop;