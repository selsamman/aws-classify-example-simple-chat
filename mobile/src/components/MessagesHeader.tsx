import {observer} from "proxily";
import {store} from "../store";
import {Person} from "../store/Person";
import {View, Text} from "react-native";
import {styles} from "./style";

function MessagesHeader () {
    const person = (new Person(store.session.currentName));
    return (
        <>
            {!!store.session.currentName &&
                <View style={styles.messagesHeader}>
                    <View style={styles.messagesHeaderContent}>
                        <Text  style={styles.name}>Chatting with {person.name}</Text>
                        <View style={styles.initials}>
                            <View style={styles.initialsContent}>
                                <Text style={styles.initialsText}>{person.initials}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
         </>
    );
}
export default observer(MessagesHeader);