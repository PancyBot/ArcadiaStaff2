declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            apiKey: string;
            enviroment: "dev" | "prod" | "debug";
            PORT: number;
            errorWebhook: string;
            PasswordApi: string;
            urlApi: string;
            serverIp: string;
            rconPassword: string;
        }
    }
}

export {};
