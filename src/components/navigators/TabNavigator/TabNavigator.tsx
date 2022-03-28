import React from "react";

// Components
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddLocationScreen, LocationsScreen } from "../../screens";

// Assets
import { TabBarIcon } from "../../uiKit";
import { theme } from "../../../core";

const { Navigator, Screen } = createBottomTabNavigator();

export const TabNavigator = () => {
	const defaultScreenOptions: BottomTabNavigationOptions = {
		headerShown: false,
		tabBarActiveTintColor: theme.colors.lightAccent,
		tabBarInactiveTintColor: "gray",
	};

	return (
		<Navigator 
			initialRouteName={"locations"}
		>
			<Screen 
				name={"locations"} 
				component={LocationsScreen} 
				options={{
					...defaultScreenOptions,
					tabBarIcon: (options) => <TabBarIcon 
						{...options} 
						iconName={"location-outline"} 
					/>
				}}
			/>
			<Screen 
				name={"add location"} 
				component={AddLocationScreen} 
				options={{
					...defaultScreenOptions,
					tabBarIcon: (options) => <TabBarIcon 
						{...options} 
						iconName={"add-outline"} 
					/>
				}}
			/>
		</Navigator>
	);
};