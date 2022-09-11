import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import { openAppSettings } from "./OsUtils.service";
import { getDataLocally, saveDataLocally } from "./LocalStorage.service";

type NotificationBody = {
	title: string,
	body: string,
	data?: unknown
}

export const registerForPushNotificationsAsync = async () => {
	if (Device.isDevice) {
		const localToken = await getDataLocally("notificationsToken");
		if (localToken) return;

		const { 
			status: currentStatus
		} = await Notifications.getPermissionsAsync();

		switch (currentStatus) {
			case "granted": {
				await onGranted();
				break;
			}
			case "denied": {
				await onDenied();
				break;
			}
			case "undetermined": {
				const { status: newStatus } = await Notifications.requestPermissionsAsync();
				if(newStatus === "granted") {
					await onGranted();
				} else {
					await onDenied();
				}
				break;
			}
		}
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}
};

export const sendPushNotification = async (
	{ 
		title,
		body, 
		data 
	}: NotificationBody) => {

	const notificationToken = await getDataLocally("notificationsToken");

	if (!notificationToken) return;

	const messageBody = {
		to: notificationToken,
		sound: "default",
		title,
		body,
		data,
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(messageBody),
	});
};

export const schedulePushNotification = async (
	{ 
		content, 
		trigger, 
		identifier
	}: Notifications.NotificationRequestInput) => {
	const defaultContent = {
		sound: true,
		vibrate: [0, 255, 255],
	};
	const defaultIdentifier = "test";

	await Notifications.scheduleNotificationAsync({
		content: {
			...defaultContent,
			...content
		},
		trigger,
		identifier: identifier ? identifier : defaultIdentifier,
	});
};

const onDenied = async () => {
	Alert.alert(
		"Permissions",
		"To get full experience with Locrem you need to allow for notifications",
		[
			{
				text: "Open Settings",
				onPress: openAppSettings,
				style: "default"
			},
			{
				text: "Cancel",
				style: "destructive"
			}
		]
	);
};

const onGranted = async () => {
	const token = (await Notifications.getExpoPushTokenAsync()).data;
	saveDataLocally("notificationsToken", token);
};