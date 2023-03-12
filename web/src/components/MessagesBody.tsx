import {observer} from "proxily";
import {store} from "../store";
import Message from "./Message";

function MessagesBody () {
    return (
        <div className="messagesBody">
            {store.session.chat?.threads.map((thread, ix) =>
                <Message key={ix} thread={thread} />)
            }
        </div>
    )
}
export default observer(MessagesBody);