import {observer} from "proxily";
import PeopleHeader from "./PeopleHeader";
import PeopleBody from "./PeopleBody";
import {styles} from "./style";
import {View} from "react-native";

function People () {
    return (
        <View style={styles.messagesContainer}>
            <PeopleHeader />
            <PeopleBody />
        </View>
    )
}

export default observer(People);