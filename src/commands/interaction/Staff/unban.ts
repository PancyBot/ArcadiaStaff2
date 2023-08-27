//901306576403591178 - Arcangel en prueba
//827542979522461768 - Arcangel
//897536859490623539 - Semi Dios NV1
//827542839226531911 - Semi Dios
//827542668795969537 - Dios
//1137897916737011802 - Console Access
//741489702963773501 - ServerId
//1137807386933997610 - ChannelLogId

import { ApplicationCommandOptionType, EmbedBuilder, TextChannel } from "discord.js";
import { Command } from "../../../structures/CommandSlash";
import axios from 'axios'

export default new Command({
    name: 'unban',
    description: 'Desbanea a un usuario en MC',
    options: [{
        name: 'gamertag',
        description: 'gamertag del usuario a banear',
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    run: async ({ interaction, args, client }) => {
        const Tag = args.getString('gamertag', true)
        const { guilds } = client
        const guildArc = guilds.cache.get('827532728232312843')
        const ChannelLog = guildArc.channels.cache.get('1137807386933997610') as TextChannel
        const ArcangelP = guildArc.roles.cache.get('901306576403591178')
        const Arcangel = guildArc.roles.cache.get('827542979522461768')
        const SemiDiosNv1 = guildArc.roles.cache.get('897536859490623539')
        const SemiDios = guildArc.roles.cache.get('827542839226531911')
        const Dios = guildArc.roles.cache.get('827542668795969537')
        const ConsoleAccess = guildArc.roles.cache.get('1137897916737011802')

        const PermsNull = new EmbedBuilder()
        .setTitle('| Sin Acceso')
        .setDescription('No tienes los permisos suficientes para este comando: \n`Rango necesario: Rango Arcangel o Superior`')
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.client.user.avatarURL() })

        if(
            !interaction.member.roles.resolve(ArcangelP) ||
            !interaction.member.roles.resolve(Arcangel) ||
            !interaction.member.roles.resolve(SemiDiosNv1) ||
            !interaction.member.roles.resolve(SemiDios) ||
            !interaction.member.roles.resolve(Dios) ||
            !interaction.member.roles.resolve(ConsoleAccess)
        ) return await interaction.followUp({ embeds: [PermsNull], ephemeral: true});

        const LogEmbed = new EmbedBuilder()
        .setTitle('| Unban Exitoso')
        .setFields([
            {
                name: 'Autor:',
                value: interaction.user.tag
            },
            {
                name: 'Usuario Desbaneado',
                value: Tag
            }
        ])
        .setColor('Orange')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.user.avatarURL() })

        const { status, statusText } = await axios({
            method: 'POST',
            url: `${process.env.urlApi}/command`,
            headers: {
                'Authorization': `Bearer ${process.env.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: {
                command: `unban ${Tag}`
            }
        })

        const ErrorEmbed = new EmbedBuilder()
        .setDescription(`⛔ | No se puede mostrar el estado del servidor porque el panel retorno el error: \`${status} | ${statusText}\``)
        .setColor('Red')

        if(status === 400) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 401) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 403) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 404) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 405) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 406) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 410) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 412) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 418) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 429) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 500) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 503) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })
        if(status === 504) return interaction.followUp({ embeds: [ErrorEmbed], ephemeral: true })

        await interaction.followUp({ embeds: [LogEmbed] })
        await ChannelLog.send({ embeds: [LogEmbed] })
    }
})