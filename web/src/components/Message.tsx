import {observer} from "proxily";
import {Thread} from "../store/Thread";

function Message ({thread} : {thread : Thread}) {
    return (
        <div>
            {thread.name}: {thread.message}
        </div>
    )
}
export default observer(Message);