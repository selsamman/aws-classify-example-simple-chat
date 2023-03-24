import {observer} from "proxily";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Button, View} from "react-native";
import {styles} from "./style";
import {wake} from "../store";

function Sleep () {
    return (
        <View style={styles.centerVerticalHorizontal}>
            <View style={styles.sleepContainer}>
                    <MaterialCommunityIcons name="chat-sleep" size={48} color="black" />
                    <Button onPress={wake} title="Wake" />
            </View>
        </View>
    )
}
export default observer(Sleep);