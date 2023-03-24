import {observer} from "proxily";
import {store} from "../store";
import {Person} from "../store/Person";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style";

function PersonComponent ({person} : {person : Person}) {
    const personStyle = person.selectable ? store.session.currentName === person.name ? styles.activePerson : styles.inactivePerson :
                      styles.disabledPerson;
    return (
        <TouchableOpacity onPress={selectPerson}>
        <View style={personStyle}>
                <View style={styles.initials}>
                    <View style={styles.initialsContent}>
                        <Text style={styles.initialsText}>{person.initials}</Text>
                    </View>
                </View>
                <Text style={styles.name}>{person.name}</Text>
        </View>
        </TouchableOpacity>
    );
    function selectPerson () {
        if (person.selectable)
            store.session.setCurrentPerson(person);
    }
}

export default observer(PersonComponent);