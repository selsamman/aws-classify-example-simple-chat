import {observer} from "proxily";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Button, View} from "react-native";
import {styles} from "./style";
import {store} from "../store";

function Sleep () {
    return (
        <View style={styles.centerVerticalHorizontal}>
            <View style={styles.sleepContainer}>
                    <MaterialCommunityIcons name="chat-sleep" size={48} color="black" />
                    <Button onPress={wake} title="Wake" />
            </View>
        </View>
    )

    async function wake() {
        await store.session.wake();
    }
}
export default observer(Sleep);