import {LocalSession} from "./LocalSession";
import {persistAsync} from "proxily";
import {setSleep, setWake} from "./classify";
import {persistConfig} from "../localstorage";

export let store  = {session: new LocalSession(), sessionReady: false};

persistAsync(new LocalSession(), persistConfig).then(s => {
    store.session = s;
    store.sessionReady = true;
    store.session.init().then(() => console.log('session initialized'));
});


setSleep(() => store.session.sleeping = true)

export function wake () {
    setWake(() => store.session.sleeping = false);
}




