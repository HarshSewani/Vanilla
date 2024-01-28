const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { afk } = require("../../utils/afk");
const VanillaCommand = require("../../structures/VanillaCommand");

class Afk extends VanillaCommand{
    get name(){
        return 'afk';
    }
    get aliases(){
        return []
    }
    get cat(){
        return 'utility';
    }
    async run(client,message,args,prefix){
    const reason = args.join(" ") || "None";

    afk.set(message.author.id, [Date.now(), reason]);

    message.channel.send(`<@${message.member.user.id}> Your  Global AFK is set to - \`${reason}\``)
  }
};
module.exports = Afk;