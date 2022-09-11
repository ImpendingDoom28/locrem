import React, { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";

import { registerForPushNotificationsAsync } from "../../../core";

type NotificationsRegistryProps = React.PropsWithChildren<Record<string, unknown>>

export const NotificationsRegistry: React.FC<NotificationsRegistryProps> = (
	{
		children
	}) => {

	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync();
	
		// This listener is fired whenever a notification is received while the app is foregrounded.
		// Notifications.addNotificationReceivedListener(() => {});
			
		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed). 
		// This listener is especially useful for routing users to a particular screen after they tap on a particular notification.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			//TODO: Add redirect to particular pin
			console.log(response);
		});
	
		return () => {
			if(responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return (
		<>{children}</>
	);
};