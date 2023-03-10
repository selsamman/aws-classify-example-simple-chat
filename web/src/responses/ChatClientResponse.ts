import {ChatClientRequest} from "../requests/ChatClientRequest";
import {session} from "../store";

export class ChatClientResponse extends  ChatClientRequest{

    static interfaceName = "ChatClientRequest";

    // Called whenever sessions are updated on the server.
    async sessions(sessions : Array<string>) {
        console.log(`Received ${sessions.length} sessions`);
        session.setSessions(sessions);
    }

    // Called when another session is sending us a message
    async receiveMessage(fromName : string, message : string) {
        session.addThread(fromName, fromName, message);
    }
}