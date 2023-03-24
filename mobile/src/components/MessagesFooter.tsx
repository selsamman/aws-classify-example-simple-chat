import {observer} from "proxily";
import {useState} from "react";
import {store} from "../store";
import {View, Button, TextInput, Text} from "react-native";
import {styles} from "./style";

function MessagesFooter() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    return (
        <View style={styles.messageFooter}>
            {store.session.currentName &&
                <View>
                        <Text>Message</Text>
                        <TextInput autoFocus={true} style={styles.inputField}
                                   multiline={true}
                                   onChangeText={ (value) => setMessage(value) }
                                   value={message} />
                     <Button title="Send" onPress={submit} />
                    {error &&
                        <View>
                            ${error}
                        </View>
                    }
                </View>
            }
       </View>
    );
    async function submit() {
         try {
            setError("");
            await store.session.sendMessage(message);
            setMessage("");
        } catch (e : any) {
            setError(e.message);
        }
    }
}

export default observer(MessagesFooter);