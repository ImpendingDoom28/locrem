import React from "react";

// Components
import { 
	Platform, 
	SafeAreaView, 
	StatusBar, 
	StyleSheet 
} from "react-native";

// Theme
import { theme } from "../../../core";

type PageViewProps = {
	dark?: boolean
}

export const PageView: React.FC<PageViewProps> = (
	{
		children,
		dark
	}) => {

	return (
		<SafeAreaView
			style={[
				styles.pageView,
				dark && styles.dark
			]}
		>
			{children}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	pageView: {
		flex: 1,
		backgroundColor: theme.colors.backgroundColor,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
	dark: {
		backgroundColor: theme.colors.darkBackgroundColor
	}
});
