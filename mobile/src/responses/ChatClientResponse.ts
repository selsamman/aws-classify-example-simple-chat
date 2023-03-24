import {ChatClientRequest} from "../requests/ChatClientRequest";
import {store} from "../store"
import {classifyClient} from "../store/classify";

export class ChatClientResponse extends  ChatClientRequest {

    static interfaceName = "ChatClientRequest";

    // Called whenever sessions are updated on the server.
    async sessions(sessions : Array<string>) {
        console.log(`Received ${sessions.length} sessions`);
        store.session.setSessions(sessions);
    }

    // Called when another session is sending us a message
    async receiveMessage(fromName : string, message : string) {
        store.session.addThread(fromName, fromName, message);
    }
}

