import {observer} from "proxily";
import {store} from "../store";
import Message from "./Message";
import {ScrollView, View} from "react-native";
import {styles} from "./style";

function MessagesBody () {
    return (
        <View style={styles.messageBody}>
        <ScrollView>
            {store.session.chat?.threads.map((thread, ix) =>
                <Message key={ix} thread={thread} />)
            }
        </ScrollView>
        </View>
    )
}
export default observer(MessagesBody);