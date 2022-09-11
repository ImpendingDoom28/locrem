import React, { useEffect, } from "react";
import { AppState, Platform, UIManager } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import { TabNavigator } from "./src/components/navigators";
import { NotificationsRegistry } from "./src/components/utils";
import { 
	schedulePushNotification 
} from "./src/core";

if (
	Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

const App = () => {

	useEffect(() => {
		AppState.addEventListener("change", (status) => {
			if(status === "background") {
				schedulePushNotification(
					{
						content: {
							sound: true,
							title: "Push notification",
							vibrate: [0, 255, 255],
							body: "Need to check application",
						},
						trigger: {
							seconds: 2
						}
					}
				);
			}
		});
	}, []);

	return (
		<NavigationContainer>
			<NotificationsRegistry>
				<StatusBar 
					style={"auto"} 
					animated
					networkActivityIndicatorVisible
				/>
				<TabNavigator />
			</NotificationsRegistry>
		</NavigationContainer>
	);
};

export default App;