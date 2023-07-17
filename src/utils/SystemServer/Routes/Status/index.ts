import { Router } from "express";
import { utils } from "../../../..";

export var StatusRouter = Router()

StatusRouter.get("/bot", (req, res) => { 
    const Payload = req.body

    if(Payload.apikey === process.env.PasswordApi) {
        res.status(200).json({ 
            bot: {
                isOnline: utils.botIsOnline(),
                statsBot: { 

                }
            },
         })
    }

    return res.status(404).json({
        error: "NotFound / NotAcces",
    })
})

console.debug("[WEB] StatusRouter is loading")