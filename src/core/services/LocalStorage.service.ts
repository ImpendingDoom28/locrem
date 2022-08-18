import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageKeys = "savedMarkers";

export const saveDataLocally = async (key: StorageKeys, data: unknown) => {
	try {
		const stringifiedData = JSON.stringify(data);
		await AsyncStorage.setItem(key, stringifiedData);
	} catch (err) {
		console.error(err);
		throw new Error("Error saving data locally: ");
	}
};

export const getDataLocally = async (key: StorageKeys) => {
	try {
		const localData = await AsyncStorage.getItem(key);
		return localData ? JSON.parse(localData) : undefined;
	} catch (err) {
		console.error(err);
		throw new Error("Error getting data locally");
	}
};