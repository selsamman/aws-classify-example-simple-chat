import {LocalSession} from "./LocalSession";
import {persistAsync} from "proxily";
import {classifyClient} from "./classify";
import {persistConfig} from "../localstorage";

export let store  = {session: new LocalSession(), sessionReady: false};

persistAsync(new LocalSession(), persistConfig).then(s => {
    store.session = s;
    store.sessionReady = true;

    classifyClient.initSocket().then( () => store.session.init().then(() => console.log('session initialized')));
});


classifyClient.onDisconnect(() => store.session.sleep());




