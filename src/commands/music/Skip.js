const { EmbedBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");

class Skip extends VanillaCommand{
    get name(){
        return 'skip'
    }
    get aliases(){
        return ['s','sk','next']
    }
    get inVoice(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get sameVoice(){
        return true;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.skip();
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Skipped the current track` , iconURL : message.author.displayAvatarURL({dynamic : true})})]});
    }
}
module.exports = Skip;