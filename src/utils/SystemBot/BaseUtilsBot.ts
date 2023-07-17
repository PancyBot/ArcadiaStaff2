import { ChannelType, Message, EmbedBuilder, TextChannel } from "discord.js";
import { updateDataBase } from "../CacheSystem/functions";
import { ExtendedClient } from "../../structures/Client";
import { client } from "../.."
const usersWithCooldown = new Map();
const cooldown = new Map();
const responses = new Map();

export class PancyBotUtils { 
    constructor(){}

    newResponse(response) {
        responses.set(response.authorId, response);
    }
    
    async getResponseAndDelete(userId) {
        if(responses.has(userId)) {
            let res = await responses.get(userId);
            responses.delete(userId);
            return res;
        }
    }
    
    botIsOnline() {
        const status = client.isReady()
        return status
    }
}