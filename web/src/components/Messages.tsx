import {observer} from "proxily";
import MessagesHeader from "./MessagesHeader";
import MessagesFooter from "./MessagesFooter";
import MessagesBody from "./MessagesBody";

function Messages () {
    return (
        <div className="messagesContainer">
           <MessagesHeader />
           <MessagesBody />
           <MessagesFooter />
        </div>
    )
}

export default observer(Messages);