import {observer} from "proxily";
import MessagesHeader from "./MessagesHeader";
import MessagesFooter from "./MessagesFooter";
import MessagesBody from "./MessagesBody";
import {View} from "react-native";
import {styles} from "./style";

function Messages () {
    return (
        <View style={styles.messagesContainer}>
           <MessagesHeader />
           <MessagesBody />
           <MessagesFooter />
        </View>
    )
}

export default observer(Messages);