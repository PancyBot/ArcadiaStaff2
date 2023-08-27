//https://api.mcstatus.io/v2/status/java/arcadianetwork.ddns.net:19132

import { Command } from "../../../structures/CommandSlash";
import axios from 'axios'
import { EmbedBuilder } from "discord.js";
import { StatusIo } from "../../../typings/serverIoStatus";

export default new Command({
    name: 'players',
    description: 'Muestra los jugadores conectados',
    
    run: async ({ interaction }) => {
        const { data } = await axios.get<StatusIo>('https://api.mcstatus.io/v2/status/java/arcadianetwork.ddns.net:19132')
        const Online = data.online
        if(Online === true) {
            let finalList = [] as string[]
            data.players.list.forEach(x => {
                finalList.push(x.name_clean)
            }) 
            const EmbedPlayer = new EmbedBuilder()
            .setTitle('👥 | Player List')
            .setDescription(`Lista de jugadores conectados ${data.players.online}/${data.players.max}:\n\`${finalList.join(', ')}\``)
            .setTimestamp()
            .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setColor('Orange')
            
            interaction.followUp({ embeds: [EmbedPlayer] })
        } else {
            const EmbedServerOff = new EmbedBuilder()
            .setTitle(' | Servidor Apagado')
            .setDescription('No se puede obtener la lista de jugadores del servidor debido a que se encuentra apagado o la ip se encuentra fallando')
            .setColor('Red')
            .setTimestamp()
            .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })

            interaction.followUp({ embeds: [EmbedServerOff] })
        }
    }
})