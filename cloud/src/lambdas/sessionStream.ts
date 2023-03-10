import {DynamoDBStreamEvent} from "aws-lambda";
import {classifyServerless} from "aws-classify-server";
import {ChatClientRequest} from "../requests/ChatClientRequest";
import {ChatServerResponse, getSessions} from "../responses/ChatServerResponse";

classifyServerless.registerRequest(ChatClientRequest);
classifyServerless.registerResponse(ChatServerResponse);

// Event handler for all dynamodb updates to a session
export async function handler(event: DynamoDBStreamEvent) {

    const sessions = await getSessions();  // All sessions
    const sessionNames = sessions.map(session => session.name); // Names suitable for returning to clients

    // Send list to each session to each session so everyone knows who is potentially online
    for (let ix = 0; ix < sessions.length; ++ix) {

        try {  // Session may have been deleted by the time event arrives

            // Create a request for this particular request
            const chatClientRequest = await classifyServerless.createRequestForSession(sessions[ix].sessionId, ChatClientRequest);
            console.log(`sending sessions to ${sessions[ix].name}` );

            // Websocket may be closed
            try {
                await chatClientRequest.sessions(sessionNames);
            } catch (_e) {};

        } catch (_e) {}
    }

}

