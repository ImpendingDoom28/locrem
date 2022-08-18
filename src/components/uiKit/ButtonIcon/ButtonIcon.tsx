import React from "react";
import { ColorValue, GestureResponderEvent } from "react-native";

// Components
import Ionicons from "react-native-vector-icons/Ionicons";

// Assets
import { theme } from "../../../core";

type TabBarIconProps = {
	focused?: boolean,
	size?: number,
	color?: number | ColorValue | undefined,
	iconName: string,
	onPress?: ((event: GestureResponderEvent) => void)
}

export const ButtonIcon: React.FC<TabBarIconProps> = (
	{
		focused, 
		size, 
		color, 
		iconName,
		onPress,
	}) => {
	const iconColor = focused ? theme.colors.lightAccent : color;

	return <Ionicons 
		name={iconName} 
		size={size}
		onPress={onPress ? onPress : undefined} 
		color={iconColor} 
	/>;
};