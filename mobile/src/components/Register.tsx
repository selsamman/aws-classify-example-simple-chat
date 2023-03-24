import {observer} from "proxily";
import {useState} from "react";
import {store, wake} from "../store";
import {View, Text, TextInput, Button} from "react-native";
import {styles} from "./style";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    return (
        <View style={styles.inputGroupContainer}>
            <Text style={styles.screenTitle}>Tell Us Who You Are</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput autoFocus={true} style={styles.inputField}
                           onChangeText={ (value) => setFirstName(value) }
                           value={firstName} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput style={styles.inputField}
                           onChangeText={ (value) => setLastName(value) }
                           value={lastName} />
            </View>
            <View>
                <Button onPress={submit} title="Submit" />
            </View>
            {error &&
                <Text>
                    ${error}
                </Text>
            }
        </View>
    );
    async function submit() {
        try {
            setError("");
            await  store.session.register(`${firstName} ${lastName}`);
        } catch (e : any) {
            setError(e.message);
        }
    }
}

export default observer(Register);