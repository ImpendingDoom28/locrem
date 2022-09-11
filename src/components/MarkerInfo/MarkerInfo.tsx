import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MarkerProps } from "react-native-maps";

import { theme } from "../../core";

type MarkerInfoProps = {
  marker: MarkerProps
}

export const MarkerInfo: React.FC<MarkerInfoProps> = ({ marker }) => {

	const {
		title,
		description
	} = marker;

	return (
		<View style={styles.markerView}>
			<View style={styles.markerViewInner}>
				<Text 
					style={styles.text}
				>
					{title}
				</Text>
				<Text 
					style={styles.lightText}
				>
					{description}
				</Text>
			</View>
			<View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	markerViewInner: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	markerView: {
		paddingHorizontal: 16,
		flex: 1,
		color: theme.colors.darkBackgroundColor,
	},
	text: {
		fontSize: 20,
		lineHeight: 24,
		color: theme.colors.white,
		marginRight: 4,
	},
	lightText: {
		fontSize: 16,
		lineHeight: 24,
		color: theme.colors.lightGray
	}
});