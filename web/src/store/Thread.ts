import {serializable} from "proxily";

export enum ThreadType {Sent, Received};

export class Thread {
    type : ThreadType = ThreadType.Sent;
    name = "";
    message = "";
    time = new Date();
    constructor(name : string, message : string, type : ThreadType) {
        this.type = type;
        this.name = name;
        this.message = message;
    }
}

serializable({Thread})