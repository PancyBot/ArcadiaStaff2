export interface StatusIo {
    online: boolean;
    host: string;
    port: number;
    eula_blocked: boolean;
    retrieved_at: number;
    expires_at: number;
    version: {
        name_raw: string;
        name_clean: string;
        name_html: string;
        protocol: 0;
    }
    players: {
        online: number;
        max: number;
        list: Array<PlayerList>
    }

}

export interface PlayerList {
    uuid: "";
    name_raw: string;
    name_clean: string;
    name_html: string;
}