const { EmbedBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");

class premium extends VanillaCommand{
    get name(){
        return 'premium';
    }
    get aliases(){
        return ['premium activate'];
    }
    async run(client,message,args,prefix){
        try{
        let ok = ["948980125251297323"];
        if(!ok.includes(message.author.id)) return;

        
        if(!args[0])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${client.user.username} Premium Info
       `}).addFields({name : ` <a:vtick:1103687545713336431> This server's Premium has already been activated by `,value : `<@948980125251297323>`}).setFooter({text : `Requested By : ${message.author.tag}`}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))]});
        }
    }
    catch(e) { console.log(e) }
}
}
module.exports = premium;