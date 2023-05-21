import { Command } from "../../../structures/CommandSlash";
import { ApplicationCommandOptionType, Colors } from "discord.js";
import { exclusiveUsers, botStaff } from "../../../utils/variables.json"
export default new Command({
    name: 'play', 
    description: 'Reproduce musica',
    options: [{
        name: "song",
        description: "URL o nombre de la cancion",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    async run ({ interaction, client, args }) {
      await interaction.followUp({ content: 'Buscando...' }) // this will give time to reply

      const memberChannel = interaction.member.voice.channelId
  
      // Spawning lavalink player
      const player = await client.player.createConnection({
        guildId: interaction.guildId,
        voiceChannel: interaction.member.voice.channelId,
        textChannel: interaction.channel.id,
        deaf: true,
        mute: false,
      })
  
      // Getting tracks
      const resolve = await client.player.resolve({
        query: args.getString('song', true),
      })
      const { loadType, tracks, playlistInfo } = resolve;
      if (loadType === "PLAYLIST_LOADED") {
  
        for (let x of resolve.tracks) {
           x.info.requester = interaction.member;
            player.queue.add(x);
  
        }
        interaction.editReply({ content: `Added: \`${resolve.tracks.length} from ${resolve.playlistInfo.name}\`` });
        if (!player.isPlaying && !player.isPaused) return player.play();
  
      }else if(loadType ==="SEARCH_RESULT"|| loadType ==="TRACK_LOADED"){
        const track = tracks.shift();
      track.info.requester = interaction.member;
  
       player.queue.add(track);
          interaction.editReply({ embeds: [{
            color: Colors.White,
            description: `Added: \`${track.info.title}\``
          }] });
          if (!player.isPlaying && !player.isPaused) return player.play();
      }else{
        return interaction.editReply({ content: "**There are no results found.**"})
      }
    }
})