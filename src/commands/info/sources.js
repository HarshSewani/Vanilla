const { EmbedBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");

class Sources extends VanillaCommand{
    get name(){
        return 'sources'
    }
    get aliases(){
        return ['source']
    }
    get vote(){
        return true;
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        let em = new EmbedBuilder().setColor(client.config.color).addFields({name : `__Supported Sources__` , value : `\`Spotify\`, \`Apple Music\`, \`SoundCloud\`, \`Deezer\``});
        return message.channel.send({embeds : [em]});
    }
}
module.exports = Sources;