import { Command } from '../../../structures/CommandSlash'
import { EmbedBuilder, ApplicationCommandOptionType, TextChannel } from 'discord.js'
import Rcon from 'rcon-srcds'

export default new Command({
    name: 'execute',
    description: 'Ejecuta un comando en el servidor',
    options: [{
        name: 'command',
        description: 'Comando a ejectar',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    isDev: true,

    run: async ({ interaction, client, args}) => {
        const { guilds } = client
        const guildArc = guilds.cache.get('827532728232312843')
        const ChannelLog = guildArc.channels.cache.get('1137807386933997610') as TextChannel
        try {
            let ArcadiaRCON = new Rcon({
                host: process.env.serverIp,
                port: 19132,
                maxPacketSize: 0
            })

            await ArcadiaRCON.authenticate(process.env.rconPassword)

            const ErrorEmbed = new EmbedBuilder()
            const auth = ArcadiaRCON.isAuthenticated()
            const connect = ArcadiaRCON.isConnected()
            if(!auth) await ArcadiaRCON.authenticate(process.env.rconPassword)
            if(!connect) return interaction.followUp({ embeds: [ErrorEmbed] })
            

            const command = args.getString('command')

            const response = await ArcadiaRCON.execute(command)
            const EmbedLog = new EmbedBuilder()
            .setTitle('| Comando ejecutado con exito')
            .setFields([
                {
                    name: 'Autor:',
                    value: interaction.member.user.tag
                },
                {
                    name: 'Comando ejecutado',
                    value: command
                },
                {
                    name: 'Respuesta',
                    value: `\`\`\`sh\n${response}\`\`\``
                }
            ])
            .setTimestamp()
            .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setColor('Green')
            const EmbedResponse = new EmbedBuilder()
            .setTitle('| Comando ejecutado con exito')
            .setDescription(`Comando ejecutado: ${command}\n\n\`\`\`sh\n${response}\`\`\``)
            .setTimestamp()
            .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setColor('Green')

            await ArcadiaRCON.disconnect()
            await interaction.followUp({ embeds: [EmbedResponse] })
            await ChannelLog.send({ embeds: [EmbedLog]})
        } catch (err) {
            const ErrorEmbed = new EmbedBuilder()
            .setTitle(`| Error`)
            .setDescription(`Ocurrio un error al ejecutar el comando: \`${err}\``)
            .setTimestamp()
            .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setColor('Red')

            interaction.followUp({ embeds: [ErrorEmbed] })
        }
    }
})