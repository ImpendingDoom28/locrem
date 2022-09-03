import React from "react";
import { Text, SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import { MarkerProps } from "react-native-maps";

import { theme } from "../../../core";

type LocationsScreenProps = {
	markers: MarkerProps[];
	setMarkers: React.Dispatch<React.SetStateAction<MarkerProps[]>>
}

export const LocationsScreen: React.FC<LocationsScreenProps> = (
	{
		markers, 
		setMarkers
	}) => {

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				ListEmptyComponent={() => {
					return (
						<View style={styles.centeredContainer}>
							<Text style={styles.text}>{"You don't have any locations yet."}</Text>
							<Text style={styles.text}>{"Go to \"Add locations\" screen to add some!"}</Text>
						</View>
					);
				}}
				data={markers}
				renderItem={({ item: marker }) => {
					return (
						<Text 
							style={styles.text}
						>
							{JSON.stringify(marker, null, 2)}
						</Text>
					);
				}}
				keyExtractor={(marker) => `${marker.coordinate.latitude}-${marker.coordinate.longitude}`}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
		backgroundColor: theme.colors.darkBackgroundColor,
	},
	text: {
		color: theme.colors.white,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}
});