import {LocalSession} from "./LocalSession";
import {persistAsync} from "proxily";
import {classifyClient, setSleep, setWake} from "./classify";
import {persistConfig} from "../localstorage";
import {ChatClientResponse} from "../responses/ChatClientResponse";

export let store  = {session: new LocalSession(), sessionReady: false};

persistAsync(new LocalSession(), persistConfig).then(s => {
    store.session = s;
    store.sessionReady = true;
    classifyClient.createResponse(ChatClientResponse);
    classifyClient.initSocket().then( () => store.session.init().then(() => console.log('session initialized')));
});


setSleep(() => store.session.sleep())

export function wake () {
    setWake(() => store.session.wake());
}




