const { EmbedBuilder, ActionRowBuilder , ButtonBuilder , ButtonStyle } = require("discord.js");
const VanillaClientEvents = require(`../../structures/Eventhandler`);

class VanillaInteractions extends VanillaClientEvents{
    get name(){
        return 'interactionCreate';
    }
    async run(interaction){
    
        if(interaction.isButton())
        {
            try{
            let player = this.client.poru.players.get(interaction.guild.id);
            let botch = interaction.guild.members.me.voice.channel;
            let ch = interaction.member.voice.channel;
            if(interaction.customId === `pl1`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.destroy();
                    return;
                }
            }
            if(interaction.customId === `pl2`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    let but1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8stop64:1155153104027779132>").setLabel(`Stop`).setCustomId(`pl1`);
        let but2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8pause64:1155153123359334461><:icons8play64:1155153126844792852>").setLabel(!player.paused ? `Resume` : `Pause`).setCustomId(`pl2`);
        let but3 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8repeat64:1155153078786469998>").setLabel(`Loop`).setCustomId(`pl3`);
        let but4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8previous64:1155153098503893083>").setLabel(`Previous`).setCustomId(`pl4`);
        let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji("<:icons8end64:1155153095844704368>").setLabel(`Skip`).setCustomId(`pl5`);
                    let ro = new ActionRowBuilder().addComponents(but4,but2,but5,but3,but1);
                    player.pause(!player.paused);
                    return interaction.update({components : [ro]});
                }
            }
            if(interaction.customId === `pl3`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    if(player.loop === `queue`)
                    {
                        player.setLoop(`none`);
                        return interaction.reply({embeds : [new EmbedBuilder().setDescription(`${this.client.emoji.cross} | **Disabled** Looping`)],ephemeral : true});
                    }
                    else{
                        player.setLoop(`queue`);
                        return interaction.reply({embeds : [new EmbedBuilder().setDescription(`${this.client.emoji.tick} | **Enabled** Looping`)],ephemeral : true});
                    }
                }
            }
            if(interaction.customId === `pl4`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    if(!player.queue.previous || player.queue.previous === null)
                    {
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | No Previous song available.`)],ephemeral : true})
                    }
                    else{
                        player.queue.unshift(player.queue.previous);
                        player.skip();
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Playing previous track`)],ephemeral : true})
                    }
                }
            }
            if(interaction.customId === `pl5`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.skip();
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **Skipped** the track`)],ephemeral : true})
                }
            }
        }
        catch(e) { console.log(e) }
    }
    }
}
module.exports = VanillaInteractions;