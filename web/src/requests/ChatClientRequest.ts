import {reqBody} from "aws-classify-common";

export class ChatClientRequest {
    static interfaceName = "ChatClientRequest";
    async sessions(sessions : Array<string>) {reqBody()}
    async receiveMessage(fromName : string, message : string) {reqBody()}
}