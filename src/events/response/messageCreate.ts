import { Event } from "../../structures/Events";
import { client } from "../..";
import { botStaff } from '../../utils/variables.json'

export default new Event('messageCreate', async msg => {
    const {guild, author} = msg

    if(!guild) return console.log('No is guild');
    if(!guild.available) return console.log('Guild unavilable');

    const prefix = "ar$"
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
      );
    
    if (!prefixRegex.test(msg.content)) return;
    if(msg.author.bot) return;

    
    const [, matchedPrefix] = msg.content.match(prefixRegex);

    const args = msg.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
      
    console.log(2)
    const command = client.commandsMsg.get(cmd)
    if(command) {
      let userPermissions = command.userPermissions;
      let botPermissions = command.botPermissions;
      if(!msg.member.permissions.has(userPermissions || [])) return msg.reply(`No tienes permisos para ejecutar este comando.\n Uno de estos permisos puede faltar: \`${typeof userPermissions === 'string' ? userPermissions : userPermissions.join(', ')}\``)
      if(!msg.guild.members.cache.get(client.user.id).permissions.has(botPermissions || [])) return msg.reply(`No tengo permisos para ejecutar este comando.\n Uno de estos permisos puede faltar: \`${typeof botPermissions === 'string' ? botPermissions : botPermissions.join(', ')}\``)
      if(command.isDev) {
        if(msg.author.id !== botStaff.ownerBot) return msg.reply('Comando solo de desarrollador')
        command.run({
          args,
          client,
          message: msg
        })
      } else {
        command.run({
          args,
          client,
          message: msg
        })
      }
    } else {
      return;
    }
  }
)