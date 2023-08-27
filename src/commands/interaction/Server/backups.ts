import { Command } from "../../../structures/CommandSlash";
import {ApplicationCommandOptionType, GuildMemberRoleManager, EmbedBuilder} from 'discord.js'
import fs from 'fs'

export default new Command({
    name: 'backups-auto',
    description: 'Creacion automatica de backups',
    options: [
        {
            name: 'status',
            description: 'true/false',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'true',
                    value: 'true'
                },
                {
                    name: 'false',
                    value: 'false'
                }
            ],
            required: true
        }
    ],
    botPermissions: ['ManageGuild'],

    run: async ({ interaction, args }) => {
        const RolAccess = interaction.guild.roles.cache.get('1137897916737011802')
        const PermsNull = new EmbedBuilder()
        .setTitle(`⛔ | Sin acceso`)
        .setDescription('No tienes permisos para ejetuar el comando\nPermiso faltante: `Console Access / BotOwner`')
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `💫 - Powered by PancyStudios | ${interaction.client.user.tag}`, iconURL: interaction.client.user.avatarURL() })

        if(interaction.user.id !== '711329342193664012'||!(interaction.member.roles as GuildMemberRoleManager).cache.has(RolAccess.id)) return interaction.reply({ embeds: [PermsNull], ephemeral: true })
        const status = args.getString('status')
        // Leer el contenido del archivo
        const fileContent = fs.readFileSync('/home/container/src/database/backupsAutoStatus.txt').toString();

        // Convertir el contenido del archivo a un número
        const number = parseInt(fileContent, 10);

        switch (status) {
            case 'true':
                switch (number) {
                    case 0:
                        interaction.followUp({ content: 'Las backups automaticas fueron activadas' })
                        fs.writeFileSync('/home/container/src/database/backupsAutoStatus.txt', `1`);
                    break;
                    case 1:
                        interaction.followUp({ content: 'Las backups automaticas estaban ya activadas' })
                    break;
                }
            break;
            case 'false':
                switch (number) {
                    case 0:
                        interaction.followUp({ content: 'Las backups automaticas ya estaban desactivadas '})
                    break;
                    case 1:
                        interaction.followUp({ content: 'Las backups automaticas fueron desactivadas' })
                        fs.writeFileSync('/home/container/src/database/backupsAutoStatus.txt', `0`);
                    break;
                }
            break;
            default:
                interaction.followUp({ content: 'error' })
            break;
        }
    }
})