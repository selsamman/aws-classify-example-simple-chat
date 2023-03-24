import {ClassifyClient} from "aws-classify-client";
import {awsURL, getSession, setSession} from "../localstorage";

export const classifyClient = new ClassifyClient(getSession, setSession, awsURL);



export function setSleep (callback : () => void) {
    classifyClient.onDisconnect(callback)
}
export function setWake( callback : () => void) {
    classifyClient.initSocket().then(callback);
}

