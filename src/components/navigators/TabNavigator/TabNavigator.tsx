import React from "react";

// Components
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddLocationScreen, LocationsScreen } from "../../screens";

// Assets
import { ButtonIcon } from "../../uiKit";
import { theme } from "../../../core";
import { routes } from "./routes";

const { Navigator, Screen } = createBottomTabNavigator();

export const TabNavigator = () => {
	const defaultScreenOptions: BottomTabNavigationOptions = {
		headerShown: false,
		tabBarActiveTintColor: theme.colors.lightAccent,
		tabBarInactiveTintColor: "gray",
		tabBarStyle: {
			borderTopWidth: 0, 
			backgroundColor: theme.colors.backgroundColor,
		},
	};

	return (
		<Navigator 
			initialRouteName={routes.addLocation}
		>
			<Screen 
				name={routes.locations} 
				component={LocationsScreen} 
				options={{
					...defaultScreenOptions,
					tabBarIcon: (options) => <ButtonIcon 
						{...options} 
						iconName={"location-outline"} 
					/>
				}}
			/>
			<Screen 
				name={routes.addLocation} 
				component={AddLocationScreen} 
				options={{
					...defaultScreenOptions,
					tabBarIcon: (options) => <ButtonIcon 
						{...options} 
						iconName={"add-outline"} 
					/>
				}}
			/>
		</Navigator>
	);
};