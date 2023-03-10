import {Thread} from "./Thread";
import {serializable} from "proxily";

export class Chat {
    name = "";
    hasSession = false;
    threads : Array<Thread> = [];
    constructor(name : string) {
        this.name = name;
    }
}

serializable({Chat});