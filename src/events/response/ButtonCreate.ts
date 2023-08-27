import {ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle, TextChannel, GuildMemberRoleManager, Message} from 'discord.js'
import axios from 'axios'
import { Event } from "../../structures/Events";
import { utils } from '../..';

export default new Event("interactionCreate", async (interaction) => {
    const ButtonsErr = new ActionRowBuilder<ButtonBuilder>()
    ButtonsErr.addComponents(
        new ButtonBuilder()
        .setCustomId('.')
        .setLabel('Iniciar')
        .setEmoji('🟢')
        .setStyle(ButtonStyle.Success)
        .setDisabled(true),
        new ButtonBuilder()
        .setCustomId('.1')
        .setLabel('Reiniciar')
        .setEmoji('🔄')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true),
        new ButtonBuilder()
        .setCustomId('.2')
        .setLabel('Detener')
        .setEmoji('🛑')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true),
        new ButtonBuilder()
        .setCustomId('.3.') 
        .setLabel('Enviar comando')
        .setEmoji('👾')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
    )
    try {
        if(!interaction.isButton) return;
        const RolAccess = interaction.guild.roles.cache.get('1137897916737011802')
    
        const PermsNull2 = new EmbedBuilder()
        .setTitle(`⛔ | Sin acceso`)
        .setDescription('No tienes permisos para ejetuar el comando\nMotivo: `No generaste este mensaje`')
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.client.user.avatarURL() })

        
    
        const ErrorEmbed = new EmbedBuilder()
        .setTitle(`⛔ | Error`)
        .setDescription('Parece ser que este boton es uno del tipo `Legacy`, genera de nuevo el mensaje\n\n`Estos botones fueron deshabilitados`')
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.client.user.avatarURL() })
        
        if(!interaction.isButton()) return;
        const buttonId = utils.getCustomId(interaction.customId)
        const authorId = utils.getAuthorId(interaction.customId)
        const buttons = ['start', 'restart', 'stop', 'console']
        if(!buttons.some(x => x !== buttonId)) return;
        if(!authorId) {
            await interaction.reply({ embeds: [ErrorEmbed], ephemeral: true})
            return await interaction.message.edit({ components: [ButtonsErr] })
        }
        if(authorId !== interaction.user.id) return await interaction.reply({ embeds: [PermsNull2], ephemeral: true })
    
        const PermsNull = new EmbedBuilder()
        .setTitle(`⛔ | Sin acceso`)
        .setDescription('No tienes permisos para ejetuar el comando\nPermiso faltante: `Console Access / BotOwner`')
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.client.user.avatarURL() })

        const LogEmbed = new EmbedBuilder()
        .setTitle('| Console')
        .setFields([
            {
                name: 'Accion realizada',
                value: `${buttonId}`
            },
            {
                name: 'Autor:',
                value: interaction.user.tag
            }
        ])
        .setColor('Orange')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })

        const channel = interaction.client.guilds.cache.get('827532728232312843').channels.cache.get('1137807386933997610') as TextChannel
        
        if(buttonId === 'start') {
            if(authorId !== '711329342193664012'||!(interaction.member.roles as GuildMemberRoleManager).cache.has(RolAccess.id)) return interaction.reply({ embeds: [PermsNull], ephemeral: true })
            try {
                const { status, data } = await axios({
                    method: 'POST',
                    url: `${process.env.urlApi}/power`,
                    headers: {
                        'Authorization': `Bearer ${process.env.apiKey}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    data: {
                        signal: "start"
                    }
                })
    
            const s = new EmbedBuilder()
            .setDescription(`**Listo el servidor respondio con el estado:** ${status}`)
            .setColor('Green')
    
            interaction.reply({ embeds: [s] })
            interaction.message.edit({ components: [ButtonsErr] })
            await channel.send({embeds: [LogEmbed]})
        } catch (err) {
            const s = new EmbedBuilder()
            .setDescription(`**Ocurrio un error interno:** ${err}`)
            .setColor('Red')
    
            interaction.reply({ embeds: [s] })
            interaction.message.edit({ components: [ButtonsErr] })
        }
        } else if(buttonId === 'restart') {
            try {
                if(authorId !== '711329342193664012'||!(interaction.member.roles as GuildMemberRoleManager).cache.has(RolAccess.id)) return interaction.reply({ embeds: [PermsNull], ephemeral: true })
                const { status, data } = await axios({
                    method: 'POST',
                    url: `${process.env.urlApi}/power`,
                    headers: {
                        'Authorization': `Bearer ${process.env.apiKey}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    data: {
                        signal: "restart"
                    }
                })
    
            const s = new EmbedBuilder()
            .setDescription(`**Listo el servidor respondio con el estado:** ${status}`)
            .setColor('Green')
    
            interaction.reply({ embeds: [s] })
            interaction.message.edit({ components: [ButtonsErr] })
            await channel.send({embeds: [LogEmbed]})
        } catch (err) {
            const s = new EmbedBuilder()
            .setDescription(`**Ocurrio un error interno:** ${err}`)
            .setColor('Red')
    
            interaction.reply({ embeds: [s] })
            interaction.message.edit({ components: [ButtonsErr] })
        }
    
        } else if(buttonId === 'stop') {
            if(authorId !== '711329342193664012'||!(interaction.member.roles as GuildMemberRoleManager).cache.has(RolAccess.id)) return interaction.reply({ embeds: [PermsNull], ephemeral: true })
            try {
                const { status, data } = await axios({
                    method: 'POST',
                    url: `${process.env.urlApi}/power`,
                    headers: {
                        'Authorization': `Bearer ${process.env.apiKey}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    data: {
                        signal: "stop"
                    }
                })
    
            const s = new EmbedBuilder()
            .setDescription(`**Listo el servidor respondio con el estado:** ${status}`)
            .setColor('Green')
    
            interaction.reply({ embeds: [s] })
            interaction.message.edit({ components: [ButtonsErr] })
            await channel.send({embeds: [LogEmbed]})
        } catch (err) {
            const s = new EmbedBuilder()
            .setDescription(`**Ocurrio un error interno:** ${err}`)
            .setColor('Red')
    
            interaction.reply({ embeds: [s] })
            interaction.message.edit({ components: [ButtonsErr] })
        }
        } else if(buttonId === 'console') {
            if(authorId !== '711329342193664012'||!(interaction.member.roles as GuildMemberRoleManager).cache.has(RolAccess.id)) return interaction.reply({ embeds: [PermsNull], ephemeral: true })
                
            const msg_filter = (m: Message) => m.author.id === interaction.user.id && m.channelId === interaction.channelId;
            const collector = interaction.channel.awaitMessages({ time: 15000, filter: msg_filter, max: 1 })
            
            interaction.reply({ content: 'Di que comando quieres ejecutar, NO USES LAS "/" ' }).then(async msg => {
                collector.then(async x => {
                    const command = x.first().content
                    if(!command) {
                        interaction.message.edit({ components: [ButtonsErr] });
                        return interaction.reply('Tardaste mucho en decir el comando')
                    }
                    const { status, data } = await axios({
                        method: 'POST',
                        url: `${process.env.urlApi}/command`,
                        headers: {
                            'Authorization': `Bearer ${process.env.apiKey}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        data: {
                            command: command
                        }
                    })
                    const adwi = new EmbedBuilder()
                    .setDescription(`El comando fue enviado, el servidor respondio con el estado ${status}`)
    
                    interaction.channel.send({ embeds: [adwi] })
                    interaction.message.edit({ components: [ButtonsErr] })
                    LogEmbed.setFields([
                        {
                            name: 'Accion realizada',
                            value: `${buttonId}`
                        },
                        {
                            name: 'Autor:',
                            value: interaction.user.tag
                        },
                        {
                            name: 'Comando ejecutado:',
                            value: command
                        }
                    ])
                    await channel.send({embeds: [LogEmbed]})
                })
            })
            .catch(err => {
                const adwi = new EmbedBuilder()
                    .setDescription(`Ocurrio un error interno ${err}`)
    
                    interaction.channel.send({ embeds: [adwi] })
                    interaction.message.edit({ components: [ButtonsErr] })
            })
        } else {
            return console.log('2')
        }
    } catch {

    }
}); 
