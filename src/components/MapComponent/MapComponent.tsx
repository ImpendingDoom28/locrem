import React, { useState } from "react";

// Components
import { ActivityIndicator, Dimensions, StyleSheet, View, Text } from "react-native";
import MapView, { LatLng, MapEvent, Marker, MarkerProps, Overlay } from "react-native-maps";
import { MarkerFormModal } from "../modals";

// Utils
import { 
	theme, 
	useGeolocation,
} from "../../core";

type MapComponentProps = {
	markers: MarkerProps[];
	setMarkers: React.Dispatch<React.SetStateAction<MarkerProps[]>>
}

export const MapComponent: React.FC<MapComponentProps> = ({ markers, setMarkers }) => {

	const {
		location: userLocation,
		loading
	} = useGeolocation();

	const [markerCoordinate, setMarkerCoordinate] = useState<LatLng | undefined>(undefined);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const initialRegion = userLocation ? {
		latitude: userLocation.coords.latitude,
		longitude: userLocation.coords.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	} : undefined;

	const onLongPress = (event: MapEvent) => {
		event.persist();
		setMarkerCoordinate(event.nativeEvent.coordinate);
		setModalVisible(true);
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
				{markers.map((marker) => {
					return (
						<Marker
							key={`${marker.coordinate.latitude}-${marker.coordinate.longitude}`}
							coordinate={marker.coordinate}
							title={marker.title}
							description={marker.description}
							pinColor={theme.colors.lightAccent}
							tappable
						/>
					);
				})}
			</MapView>
			{!loading && (
				<Overlay 
					image={1}
					bounds={[[0,0],[0,0]]}
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
		bottom: 16,
		left: 0,
		right: 0,
	},
	overlayView: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: theme.colors.darkBackgroundColor,
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