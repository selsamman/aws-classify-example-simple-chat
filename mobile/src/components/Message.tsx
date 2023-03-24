import {observer} from "proxily";
import {Thread} from "../store/Thread";
import {View, Text} from "react-native";

function Message ({thread} : {thread : Thread}) {
    return (
        <View>
            <Text>{thread.name}: {thread.message}</Text>
        </View>
    )
}
export default observer(Message);