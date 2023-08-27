import { ExtendedClient } from './structures/Client'
import { AntiCrash } from "./utils/SystemError/CrashError";
import { PancyBotUtils } from "./utils/SystemBot/BaseUtilsBot";
import { app } from "./utils/SystemServer";
import donenv from 'dotenv';

donenv.config();
const firstTime = Date.now();

var PORT = process.env.PORT || 3000
export const client = new ExtendedClient()
export const crashClient = new AntiCrash()
export const utils = new PancyBotUtils()
export let filesTemp = []
client.start()
crashClient.inint()

setTimeout(() => {
    app.listen(PORT,() => {
        console.debug('[WEB] Start listening on ', PORT)
    })
}, 5000)
console.log(process.env.urlApi)
console.log(process.env.botToken)
console.log(process.env.apiKey)
console.debug(`[SYSTEM] Bot start in ${Date.now() - firstTime}ms`)


