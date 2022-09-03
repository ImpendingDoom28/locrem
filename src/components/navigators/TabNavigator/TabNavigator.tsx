import React, { useEffect, useState } from "react";

// Components
import { MarkerProps } from "react-native-maps";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddLocationScreen, LocationsScreen } from "../../screens";

// Assets
import { ButtonIcon } from "../../uiKit";
import { getDataLocally, saveDataLocally, theme } from "../../../core";
import { routes } from "./routes";

const { Navigator, Screen } = createBottomTabNavigator();

const defaultScreenOptions: BottomTabNavigationOptions = {
	headerShown: false,
	tabBarActiveTintColor: theme.colors.lightAccent,
	tabBarInactiveTintColor: "gray",
	tabBarStyle: {
		borderTopWidth: 0, 
		backgroundColor: theme.colors.backgroundColor,
	},
};

export const TabNavigator = () => {
	const [markers, setMarkers] = useState<MarkerProps[]>([]);

	useEffect(() => {
		getDataLocally("savedMarkers").then((data) => {
			if(data) {
				const markers = data as MarkerProps[];
				if(markers.length) {
					setMarkers(markers);
				}
			}
		});
	}, []);

	useEffect(() => {
		if(markers.length) {
			saveDataLocally("savedMarkers", markers);
		}
	}, [markers]);

	return (
		<Navigator 
			initialRouteName={routes.addLocation}
		>
			<Screen 
				name={routes.locations} 
				options={{
					...defaultScreenOptions,
					tabBarIcon: (options) => <ButtonIcon 
						{...options} 
						iconName={"location-outline"} 
					/>,
				}}
			>
				{() => {
					return (
						<LocationsScreen
							markers={markers}
							setMarkers={setMarkers} 
						/>
					);
				}}
			</Screen>
			<Screen 
				name={routes.addLocation} 
				options={{
					...defaultScreenOptions,
					tabBarIcon: (options) => <ButtonIcon 
						{...options} 
						iconName={"add-outline"} 
					/>
				}}
			>
				{() => {
					return (
						<AddLocationScreen
							markers={markers}
							setMarkers={setMarkers} 
						/>
					);
				}}
			</Screen>
		</Navigator>
	);
};