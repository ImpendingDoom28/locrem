import React, { useEffect, useState } from "react";

// Components
import { ActivityIndicator, Dimensions, StyleSheet, View, Text, Vibration } from "react-native";
import MapView, { LatLng, MapEvent, Marker, MarkerProps, Overlay } from "react-native-maps";
import { MarkerFormModal } from "../modals";

// Utils
import { theme, useGeolocation } from "../../core";
import { getDataLocally, saveDataLocally } from "../../core/services/LocalStorage.service";

export const MapComponent = () => {

	const {
		location: userLocation,
		loading
	} = useGeolocation();

	const [markerCoordinate, setMarkerCoordinate] = useState<LatLng | undefined>(undefined);
	const [markers, setMarkers] = useState<MarkerProps[]>([]);
	const [modalVisible, setModalVisible] = useState(false);

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
		if(markers) {
			saveDataLocally("savedMarkers", markers);
		}
	}, [markers]);

	const initialRegion = userLocation ? {
		latitude: userLocation.coords.latitude,
		longitude: userLocation.coords.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	} : undefined;

	const onLongPress = (event: MapEvent) => {
		event.persist();
		Vibration.vibrate();
		setMarkerCoordinate(event.nativeEvent.coordinate);
		setModalVisible(true);
	};

	const onMarkerPress = (event: MapEvent) => {
		event.preventDefault();
	};

	return (
		<View style={styles.viewContainer}>
			<MapView 
				rotateEnabled={false}
				showsPointsOfInterest={false}
				initialRegion={initialRegion}
				onLongPress={onLongPress}
				style={styles.map} 
			>
				{markers.map((marker, index) => {
					return <Marker
						key={index}
						coordinate={marker.coordinate}
						pinColor={theme.colors.lightAccent}
						tracksViewChanges
						tappable
						onPress={onMarkerPress}
						title={marker.title}
						description={marker.description}
					/>;
				})}
			</MapView>
			{!loading && (
				<Overlay 
					image={1}
					bounds={[[0,0],[0,0]]}
					opacity={0.8}
					style={styles.overlay}
				>
					<View style={styles.overlayView}>
						<Text style={styles.overlayText}>
							{"Press and hold to add marker"}
						</Text>
					</View>
				</Overlay> 
			)}
			{loading && (
				<View style={styles.loaderContainer}>
					<ActivityIndicator 
						size={"large"} 
						color={theme.colors.accent}
						hidesWhenStopped={false}
					/>
				</View>
			)}
			<MarkerFormModal
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}
				markerCoordinate={markerCoordinate}
				setMarkers={setMarkers}
			/>
		</View>
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
	overlay: {
		flex: 1,
		alignItems: "center",
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
	},
	overlayView: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: theme.colors.backgroundColor,
	},
	overlayText: {
		fontSize: 16,
		color: theme.colors.lightAccent,
		padding: 12,
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});