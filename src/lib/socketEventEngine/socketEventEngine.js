import {WSSERVER} from "../util/constants.js";
import {io} from "socket.io-client";

class SocketEventEngine {

    constructor() {
        this.socket = io(WSSERVER,{
            withCredentials: true,
            auth: {
                token: SocketEventEngine.getSessionToken()
            }
        });

    }

    async register(event, callback){
        await this.deregister(event);
        this.socket.on(event, callback);

    }

    async request(outEvent, body) {
        this.socket.emit(outEvent, body);

    }

    async deregister(event) {
        // By current design we will only register one event
        this.socket.off(event);
    }

    static getSessionToken() {
        let cookieList = document.cookie.split("=");
        console.log(cookieList);

        for (let i = 0; i < cookieList.length; i++) {
            console.log(i);
            if (cookieList[i] == "auth_session") {
                console.log(i+1)
                console.log(cookieList[i+1])
                return cookieList[i+1]
            }
        }

    }


}

export default SocketEventEngine