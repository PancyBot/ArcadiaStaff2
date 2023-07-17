import { client } from "../..";
import { Event } from "../../structures/Events";
import { privateBot } from "../../../package.json"

export default new Event('guildCreate', async guild => {
    if(privateBot === true) {
        
    } 
})