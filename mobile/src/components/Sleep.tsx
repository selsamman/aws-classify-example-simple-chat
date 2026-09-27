import {observer} from "proxily";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {Button, View} from "react-native";
import {styles} from "./style";
import {store} from "../store";

function Sleep () {
    return (
        <View style={styles.centerVerticalHorizontal}>
            <View style={styles.sleepContainer}>
                    <MaterialDesignIcons name="chat-sleep" size={48} color="black" />
                    <Button onPress={wake} title="Wake" />
            </View>
        </View>
    )

    async function wake() {
        await store.session.wake();
    }
}
export default observer(Sleep);
