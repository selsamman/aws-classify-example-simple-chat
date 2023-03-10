import {ClassifyClient} from "aws-classify-client";
import {ChatServerRequest} from "../requests/ChatServerRequest";
import {ChatClientResponse} from "../responses/ChatClientResponse";

export const classifyClient = new ClassifyClient(getSession, setSession);
export const chatServerRequest = classifyClient.createRequest(ChatServerRequest);
classifyClient.createResponse(ChatClientResponse);
classifyClient.initSocket().then(() => console.log('WebSocket Ready'));

async function getSession () {
    return localStorage.getItem('ClassifySession') || "None"
}
async function setSession(sessionId : string) {
    localStorage.setItem('ClassifySession', sessionId);
}

export function setSleep (callback : () => void) {
    classifyClient.onDisconnect(callback)
}
export function setWake( callback : () => void) {
    classifyClient.initSocket().then(callback);
}

