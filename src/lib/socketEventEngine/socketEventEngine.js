import {HTTPSERVER} from "../util/constants.js";

class SocketEventEngine {

    constructor() {
        this.socket = io("ws://" + HTTPSERVER);

        this.socket.on("rp_response", () => {
            

            }
        )
    }


}