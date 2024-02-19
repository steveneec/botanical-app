import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveString(params: {key: string, value: string}) {
    try {
        await AsyncStorage.setItem(params.key, params.value)
    } catch (error) {
        console.log(error)
    }
}

export async function getString(params: {key: string}) {
    try {
        const value = await AsyncStorage.getItem(params.key)
        return value;
    } catch (error) {
        console.log(error)
    }
}

export async function saveObject(params:{key: string, value: object}) {
    try {
       const jsonValue = JSON.stringify(params.value);
       await AsyncStorage.setItem(params.key, jsonValue); 
    } catch (error) {
        console.log(error)
    }
}

export async function getObject(params:{key: string}) {
    try {
        const jsonValue = await AsyncStorage.getItem(params.key);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log(error)
    }    
}

export async function removeStorage(params:{key: string}) {
    try {
        await AsyncStorage.removeItem(params.key);
    } catch (error) {
        console.log(error);
    }
}