import {observer} from "proxily";
import {store} from "../store";
import {Person} from "../store/Person";
import {ScrollView, Text, View} from "react-native";
import {styles} from "./style";

function PeopleHeader () {
    const person = (new Person(store.session.name));
    return (
        <View style={styles.messagesHeader}>

                <View style={styles.messagesHeaderContent}>
                    <Text style={styles.name}>
                        I am {person.name}
                    </Text>
                    <View style={styles.initials}>
                        <View style={styles.initialsContent}>
                            <Text style={styles.initialsText}>{person.initials}</Text>
                        </View>
                    </View>
                </View>

        </View>
    );
}
export default observer(PeopleHeader);