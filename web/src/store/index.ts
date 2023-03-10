import {LocalSession} from "./LocalSession";
import {persist} from "proxily";
import {setSleep, setWake} from "./classify";

export const session = persist(new LocalSession(), {});

setSleep(() => session.sleeping = true)

export function wake () {
    setWake(() => session.sleeping = false);
}




