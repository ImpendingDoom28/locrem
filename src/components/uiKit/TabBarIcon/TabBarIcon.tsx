import React from "react";

// Components
import Ionicons from "react-native-vector-icons/Ionicons";

// Assets
import { theme } from "../../../core";

type TabBarIconProps = {
	focused: boolean,
	size: number,
	color: string,
	iconName: string,
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({focused, size, color, iconName}) => {
	const iconColor = focused ? theme.colors.lightAccent : color;

	return <Ionicons 
		name={iconName} 
		size={size} 
		color={iconColor} 
	/>;
};