import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Sleep from "./src/components/Sleep";
import Messages from "./src/components/Messages";
import Register from "./src/components/Register";
import People from "./src/components/People";
import {styles} from "./src/components/style";
import {store} from "./src/store";
import {observer} from "proxily";
import {classifyClient} from "./src/store/classify";
import {ChatClientResponse} from "./src/responses/ChatClientResponse";

classifyClient.createResponse(ChatClientResponse);

function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
    <View style={styles.container}>
        {store.sessionReady &&
            <>
                {!!store.session.name ?
                    <>
                        {store.session.sleeping ?
                            <Sleep/>
                            :
                            <View style={styles.chatContainer}>
                                <People/>
                                <Messages/>
                            </View>
                        }
                    </>
                    :
                    <Register/>

                }
            </>
        }
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

export default observer(App);
