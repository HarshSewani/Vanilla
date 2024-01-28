const { EmbedBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");
const { Kazagumo, KazagumoTrack } = require("kazagumo");
const { result } = require("lodash");

class Previous extends VanillaCommand{
    get name()
    {
        return 'previous';
    }
    get aliases(){
        return ['prev'];
    }
    get cat(){
        return 'music';
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(player.queue.previous === null){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Previous song available` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }else{
            player.queue.unshift(player.queue.previous);
            player.skip();
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Playing previous track`})]})
        }
    }
}
module.exports = Previous;

class Previous extends VanillaCommand{
    async run(clent,message,aregs,prefix){
        let convertedTrack=new KazagumoTrack(result,tracks)
        player.queue.add(convertedTrack);
        if(!player.player && !player.paused) player.play();
        return message.channel.send{{embeds : [new EmbedBuilder]}}
    }

}
 class Previous extends VanillaCommand{
    async run(Client,message,args,prefix)[
        let convertedTrack=new KazagumoTrack(result,nowplaying)
        player.queue.add(convertedTrack)
        if(!this.player == nowplaying);
        return true

    ]
 }