import {reqBody} from 'aws-classify-common';

export class ChatServerRequest {

    static interfaceName = 'ChatServerRequest';

    async register(name : string) {reqBody()}
    async connect(name : string) {reqBody()}
    async getSessions() : Promise<Array<string>> {return reqBody()}
    async sendMessage(sessionId : string, message : string) {reqBody()}
}