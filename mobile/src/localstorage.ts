import AsyncStorage from '@react-native-async-storage/async-storage';
export const awsURL = process.env.EXPO_PUBLIC_API_URL || '';
if (!awsURL) throw new Error('EXPO_PUBLIC_API_URL is required to connect to the deployed chat API');

export async function getSession() {
    return (await AsyncStorage.getItem('ClassifySession')) || "None";
}

export async function setSession(sessionId: string) {
    await AsyncStorage.setItem('ClassifySession', sessionId)
}

export const persistConfig = {storageEngine: AsyncStorage}
