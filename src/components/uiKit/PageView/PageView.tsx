import React from "react";

// Components
import { 
	Platform, 
	SafeAreaView, 
	StatusBar, 
	StyleSheet 
} from "react-native";

// Theme
import { theme } from "../../../core/theme/theme";

type PageViewProps = Record<string, unknown>

const PageView: React.FC<PageViewProps> = (
	{
		children
	}) => {
	return (
		<SafeAreaView
			style={styles.pageView}
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
	}
});

export default PageView;