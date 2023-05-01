import { Command } from "../../../structures/CommandMsg";
import { install_commands } from "../../../utils/install";
import axios from 'axios'
import { version } from '../../../../package.json'
import { EmbedBuilder, Colors } from "discord.js";
import { app } from "../../../utils/SystemServer";

export default new Command({
    name: 'force',
    description: 'Fuerza el uso de una funcion',
    use: '<function>',
    category: 'dev',
    isDev: true,

    async run({ message, args, client }) {
        if(args[0] === 'install') {
            install_commands(client, message.guild)
            .catch(x => {
                message.reply('Ocurrio un error al ejecutar la funcion. Mas info en consola')
                console.error(x)
            })
            .finally(() => {
                message.reply('Se completo la funcion')
            })
        } else if(args[0] === 'webhookPost') {
            const Embed = new EmbedBuilder()
            .setDescription('Tested')

            
            let statusCode: number

            const {status} = await axios.post(process.env.errorWebhook, {
                username: `PancyBot ${version} | ForceFunctions`,
                embeds: [
                    Embed
                ]
            })

            statusCode = status

            console.warn(`[ForceFunctions] :: Sent CrashError Simulator to Webhook, Status Code: ${statusCode}`);

            message.reply(`Status Code: ${statusCode}`) // Status Code: 200
        } else if(args[0] === "killSystem") {
            const Embed = new EmbedBuilder()
            .setDescription('Estas seguro que quieres forzar esta funcion?, en caso de estar seguro escribe `confirm`')
            .setColor(Colors.Yellow)
            .setFooter({ text: `PancyBot v${version} | Dev Funtions`, iconURL: client.user.avatarURL() })
            
            const msg_filter = (m) => m.author.id === message.author.id && m.channelId === message.channelId;
            const collector = message.channel.awaitMessages({ time: 15000, filter: msg_filter, max: 1 })

            message.reply({ embeds: [Embed] }).then(async msg => {
                collector.then(async x => {
                    const actionConfirm = x.first().content 
                    if(!actionConfirm) {
                        Embed.setDescription('Accion cancelada')
                        msg.edit({ embeds: [Embed] })
                                                return
                        
                    }
                    if(actionConfirm !== 'confirm') {
                        Embed.setDescription('Accion cancelada')
                        msg.edit({ embeds: [Embed] })
                                                return
                    }

                    const EmbedConfirm = new EmbedBuilder()
                    .setDescription("Apagando sistema...\n\n\n||Es probable que tengas que volver a ejecutar este comando mas de 2 veces||")
                    msg.edit({ embeds: [EmbedConfirm], })

                    await msg.react('✅')
                    client.destroy()
                    process.exit(1)
                })
            })

        } else if(args[0] === "killWebServer") {
            
        }
        else {
            message.reply('No existe la funcion')
        }
    }
})