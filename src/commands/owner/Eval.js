const { EmbedBuilder } = require("discord.js");
const VanillaCommand = require("../../structures/VanillaCommand");
const { inspect } = require(`util`);
class Eval extends VanillaCommand{
    get name(){
        return 'eval'
    }
    get aliases(){
        return ['jsk','jadu','exe']
    }
    async run(client,message,args,prefix){
        let punit = ['948980125251297323'];
        if(!punit.includes(message.author.id)) return message.reply({content : `${client.emoji.cross} | Be my owner to run this command.`})
        else{
            if(!args[0])
            {
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Provide me something to evaluate`)]})
            }
            let ok;
            let player = client.poru.players.get(message.guild.id);
            try{
                ok = await eval(args.join(' '));
                ok = inspect(ok,{depth : 0});
            } catch(e) { ok = inspect(e,{depth : 0}) }
            let em = new EmbedBuilder().setColor(client.config.color).setDescription(`\`\`\`js\n${ok}\`\`\``);
            return message.channel.send({embeds : [em]});
        }
    }
}
module.exports = Eval;