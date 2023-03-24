import AsyncStorage from '@react-native-async-storage/async-storage';
import * as serverlessOutput from '../output.json';
export const awsURL = `https://${serverlessOutput.WebsiteUrl}/api/dispatch`;

export async function getSession() {
    return (await AsyncStorage.getItem('ClassifySession')) || "None";
}

export async function setSession(sessionId: string) {
    await AsyncStorage.setItem('ClassifySession', sessionId)
}

export const persistConfig = {storageEngine: AsyncStorage}