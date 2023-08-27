import { Command } from "../../../structures/CommandSlash";
import { ButtonBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { utils } from "../../..";
import axios, { AxiosResponse } from 'axios'
import moment from "moment";
import 'moment-duration-format'

export default new Command({
    name: 'status',
    description: 'Mira el estado del servidor',

    run: async ({interaction}) => {
 
    const FirstEmbed = new EmbedBuilder()
    .setDescription("⏳ | Obteniendo el estado del servidor `b44bb677`")
    .setColor('Yellow')

    interaction.followUp({ embeds: [FirstEmbed] }).then(async(msg) => {
        
        axios.get(`${process.env.urlApi}/resources`, {
            headers: {
                "Authorization": `Bearer ${process.env.apiKey}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            timeoutErrorMessage: 'ES: 501',
            withCredentials: true
        }).catch(x => {
            const status = x.response.status
            const statusMsg = x.response.statusText
            console.log(status)
            console.log(statusMsg)

            const ErrorEmbed = new EmbedBuilder()
            .setDescription(`⛔ | No se puede mostrar el estado del servidor porque el panel retorno el error: \`${status} | ${statusMsg}\``)
            .setColor('Red')

            const ButtonsErr = new ActionRowBuilder<ButtonBuilder>()
            ButtonsErr.addComponents(
                new ButtonBuilder()
                .setCustomId(`start${interaction.user.id}`)
                .setLabel('Iniciar')
                .setEmoji('🟢')
                .setStyle(ButtonStyle.Success)
                .setDisabled(true),
                new ButtonBuilder()
                .setCustomId('restart')
                .setLabel('Reiniciar')
                .setEmoji('🔄')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
                new ButtonBuilder()
                .setCustomId('stop')
                .setLabel('Detener')
                .setEmoji('🛑')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true),
                new ButtonBuilder()
                .setCustomId('console')
                .setLabel('Enviar comando')
                .setEmoji('👾')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            )

            if(status === 400) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 401) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 403) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 404) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 405) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 406) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 410) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 412) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 418) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 429) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 500) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 503) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(status === 504) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
        })
        .then(a => {
                const AxiosResponse = a as AxiosResponse
                const { status, data} = AxiosResponse
                
                console.log(data.attributes)

                const actividad = moment.duration(data.attributes.resources.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");

                const Embed = new EmbedBuilder()
                .setDescription(
                    `**Estado:** \`${utils.statusServer(data.attributes.current_state)}\`
                    **Nombre:** \`ArcadiaRolePlay\`
                    **Tiempo en linea:** \`${actividad}\`
                    **CPU:** \`${data.attributes.resources.cpu_absolute} %\`
                    **NET:** \`⬆ ${utils.memory(data.attributes.resources.network_rx_bytes)} / ⬇ ${utils.memory(data.attributes.resources.network_tx_bytes)}\`
                    **RAM:** \`${utils.memory(data.attributes.resources.memory_bytes)}\`
                    **DISCO:** \`${utils.memory(data.attributes.resources.disk_bytes)}\`
                    `
                )
                .setColor('Green')
                    
                
                const Buttons = new ActionRowBuilder<ButtonBuilder>()
                Buttons.addComponents(
                    new ButtonBuilder()
                    .setCustomId(`start${interaction.user.id}`)
                    .setLabel('Iniciar')
                    .setEmoji('🟢')
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId(`restart${interaction.user.id}`)
                    .setLabel('Reiniciar')
                    .setEmoji('🔄')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId(`stop${interaction.user.id}`)
                    .setLabel('Detener')
                    .setEmoji('🛑')
                    .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                    .setCustomId(`console${interaction.user.id}`)
                    .setLabel('Enviar comando')
                    .setEmoji('👾')
                    .setStyle(ButtonStyle.Secondary),
                )

                msg.edit({embeds: [Embed], components: [Buttons]})
            })
        })
    }
})