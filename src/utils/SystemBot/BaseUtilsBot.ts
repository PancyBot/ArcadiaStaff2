import { client } from "../.."
const responses = new Map();


export class PancyBotUtils { 
    constructor(){
        console.log('Support: PancyStudios')
    }

    memory(bytes = 0) {
        const gigaBytes = bytes / 1024 ** 3;  
        
        if(gigaBytes > 1) { 
            return `${gigaBytes.toFixed(1)} GB`;  
        }
    
        const megaBytes = bytes / 1024 ** 2;  
        
        if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`; 
        
            
        if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 
    
            
        return `${Math.floor(megaBytes)} MB`;  
    }
    /**
     * @param {String[0]} status
     */
    statusServer (status: string) {
        let returnStatus = ''
        switch (status) {
            case 'running':
                returnStatus = '🟢 Encendido'
                break;
            case 'starting':
                returnStatus = '🟡 Encendiendo'
                break;
            case 'stopping':
                returnStatus = '🟠 Apagando'
                break;
            case 'offline':
                returnStatus = '🔴 Apagado'
                break;
            default:
                returnStatus = '🟣 Estado Invalido'
                break
        }
        return returnStatus
    }

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

    getCustomId(str: string) {
        const match = str.match(/([a-z])+/gm)
        console.log(`[UTILS] CustomId: ${match}`)
        return match ? match.join('') : ''
    }

    getAuthorId(str: string) {
        const match = str.match(/([0-9])+/gm)
        console.log(`[UTILS] AuthorId: ${match}`)
        return match ? match.join('') : ''
    }
}