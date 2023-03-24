import {observer} from "proxily";
import {store} from "../store";
import Person from "./Person";
import {View, Text, ScrollView} from "react-native";
import {styles} from "./style";

function PeopleBody () {
    return (
        <View style={styles.messageBody}>
            <ScrollView>
                {store.session.people.length > 0 ?
                    <>
                        {store.session.people.map(person => <Person key={person.name} person={person}/>)}
                    </>
                    :
                    <>
                        <Text>No Friends?</Text>
                        <Text>Open app on another phone or on the web and impersonate some!</Text>
                    </>
                }
            </ScrollView>
        </View>
    );
}

export default observer(PeopleBody);