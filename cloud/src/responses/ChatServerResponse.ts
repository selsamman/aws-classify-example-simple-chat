import {ChatServerRequest} from "../requests/ChatServerRequest";
import {ChatClientRequest} from "../requests/ChatClientRequest";
import {classifyServerless} from "aws-classify-server";
import {serializable} from "js-freeze-dry";

classifyServerless.registerRequest(ChatClientRequest);

class DeferredMessage {
    fromName = "";
    message;
    constructor(fromName : string, message : string) {
        this.fromName = fromName;
        this.message = message;
    }
}

export class ChatServerResponse extends ChatServerRequest {

    name = "";
    deferredMessages : Array<DeferredMessage> = [];

    async register(name : string) {
        if ((await getSessions()).find(session => session.name === name))
            throw new Error('Another Session is using that name');
        this.name = name;
        classifyServerless.setUserId(this, name);
    }

    async connect(name : string) {
        if (this.name !== name)
            await this.register(name);

        classifyServerless.setUserId(this, name);

        // Return any deferred messages
        if (this.deferredMessages.length) {
            const req = await classifyServerless.createRequest(this, ChatClientRequest);
            for (let ix = 0; ix < this.deferredMessages.length; ++ix) {
                const msg = this.deferredMessages[ix];
                await req.receiveMessage(msg.fromName, msg.message);
            }
            this.deferredMessages = [];
        }
    }

    async sendMessage(toName : string, message : string) {
        const sessionId = (await classifyServerless.getSessionsForUserId(toName))[0];
        console.log(`request to send message to ${sessionId}`);
        try {
            await classifyServerless.createResponse(ChatServerResponse, sessionId, async chatServerResponse => {
                const req = await classifyServerless.createRequest(chatServerResponse, ChatClientRequest);

                try {
                    await req.receiveMessage(this.name, message);
                    console.log(`Messages for ${chatServerResponse.name} sent`);
                } catch (e) {
                    this.deferredMessages.push(new DeferredMessage(this.name, message));
                    console.log(`Messages for ${chatServerResponse.name} queued`);
                }
            });
        } catch (_e) {
            throw new Error(`That person's session just expired`)
        }
    }

    async getSessions() : Promise<Array<string>> {
        return (await getSessions()).map(session => session.name);
    }
}

serializable({ChatServerResponse, DeferredMessage});

type Sessions = Array<{name: string, sessionId: string}>;

// Return a list containing the sessions and names of everyone
export async function getSessions () : Promise<Sessions> {

    // Get list of all sessions.  Note: Never do this in a production app
    const sessionIds = await classifyServerless.getSessions();

    // Compose list of sessions to be sent to each session by creating a response so we can fish out the name
    const sessions : Sessions = [];
    console.log(`sessioinIds = ${sessionIds.join(",")}`);
    for (let ix = 0; ix < sessionIds.length; ++ix) {
        const response = await classifyServerless.createResponse(ChatServerResponse, sessionIds[ix],
            async chatServerResponse => {
                // Make sure session is post-register and has a name
                if (chatServerResponse.name) {
                    sessions.push({name: chatServerResponse.name, sessionId: sessionIds[ix]});
                }
            }
        );
    }
    return sessions;
}