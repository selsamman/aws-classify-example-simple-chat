import {Thread} from "./Thread";
import {serializable} from "proxily";

export class Chat {
    name = "";
    hasSession = false;
    threads : Array<Thread> = [];
    constructor(name : string, hasSession = true) {
        this.name = name;
        this.hasSession = hasSession;
    }
}

serializable({Chat});