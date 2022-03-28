import React, { useEffect, useState } from "react";

// Components
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import MapView, { Overlay, Region } from "react-native-maps";

// Utils
import { theme, useGeolocation } from "../../core";

export const MapComponent = () => {

	const {
		location: userLocation,
		loading
	} = useGeolocation();

	const initialRegion = userLocation ? {
		latitude: userLocation.coords.latitude,
		longitude: userLocation.coords.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	} : undefined;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.viewContainer}>
				<MapView 
					initialRegion={initialRegion}
					style={styles.map} 
				/>
				{loading && (
					<View style={styles.loaderContainer}>
						<ActivityIndicator 
							size={"large"} 
							color={theme.colors.accent}
							hidesWhenStopped={false}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundColor,
	},
	viewContainer: {
		flex: 1,
		position: "relative",
	},
	loaderContainer: {
		flex: 1,
		position: "absolute",
		backgroundColor: theme.colors.overlayColor,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});