import {observer} from "proxily";
import PeopleHeader from "./PeopleHeader";
import PeopleBody from "./PeopleBody";

function People () {
    return (
        <div className="messagesContainer">
            <PeopleHeader />
            <PeopleBody />
        </div>
    )
}

export default observer(People);