import { Event } from "../../structures/Events";
import { version } from "../../../package.json"
import { client, crashClient, utils } from "../..";
import { ActivityType, EmbedBuilder, TextChannel } from "discord.js"
import { logger } from "../../utils/SystemError/CrashError";
import axios from 'axios'
import fs from 'fs'
export default new Event('ready', async (_) => {
    console.log('Bot encendido')

    const activities = [
        `ArcadiaStaff | ${version}`,
        `ar$ | ${version}`,
    ]

    const random = activities[Math.floor(Math.random() * activities.length)]

    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: random,
                type: ActivityType.Playing,
            }],
            status: 'dnd',
            afk: false,
        })
    }, 1000 * 15)

    try {
        const channel = client.guilds.cache.get('827532728232312843').channels.cache.get('1137807386933997610') as TextChannel
        setInterval(async() => {
            const fileContent = fs.readFileSync('/home/container/src/database/backupsAutoStatus.txt').toString();
    
            const number = parseInt(fileContent, 10);
    
            if(number === 1) {
                const ai = await axios.get(`${process.env.urlApi}/backups`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.apiKey}`,
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    },
                    timeoutErrorMessage: 'ES: 501',
                    withCredentials: true
                })
                const backupOldUUID = ai.data.data[4].attributes.uuid

                const EmbedDelete = new EmbedBuilder()
                .setTitle('| Automatic Backups')
                .setDescription('Backup Delete')
                .setFields([
                    {
                        name: 'Name',
                        value: `${ai.data.data[4].attributes.name}`
                    },
                    {
                        name: 'Size',
                        value: `${utils.memory(ai.data.data[4].attributes.bytes)}`
                    }
                ])
                .setColor('Red')
                .setFooter({ text: `💫 - Powered by PancyStudios | ${client.user.tag}`, iconURL: client.user.avatarURL()})
                .setTimestamp()

                await axios.delete(`${process.env.urlApi}/backups/${backupOldUUID}`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.apiKey}`,
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    },
                    timeoutErrorMessage: 'ES: 501',
                    withCredentials: true
                })
    
                await channel.send({ embeds: [EmbedDelete] })

                const ui = await axios.post(`${process.env.urlApi}/backups`, {}, {
                    headers: {
                        "Authorization": `Bearer ${process.env.apiKey}`,
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    },
                    timeoutErrorMessage: 'ES: 501',
                    withCredentials: true
                }) 

                const EmbedCreated = new EmbedBuilder()
                .setTitle('| Automatic Backups')
                .setDescription('Backup create')
                .setFields([
                    {
                        name: 'Name',
                        value: `${ui.data.attributes.name}`
                    },
                ])
                .setColor('Green')
                .setFooter({ text: `💫 - Powered by PancyStudios | ${client.user.tag}`, iconURL: client.user.avatarURL() })
                .setTimestamp()

                await channel.send({ embeds: [EmbedCreated]})
            } else {
                return;
            }
        }, 3600000) 
    } catch {
        crashClient.report({ error: 'CRITICAL | Bakcups Error', message: 'El sistemas de backups fallo, urgente revision de codigo'})
        logger.emerg(`EMERGENCY | Backups system failed`)
        console.error('EMERGENCY | El sistema de backups a fallado, iniciando apagado')
        client.destroy()
        console.log('Apagando...')
        process.abort()
    }

})