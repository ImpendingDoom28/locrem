import React from "react";
import { Text, StyleSheet, FlatList, View, Alert } from "react-native";
import { MarkerProps } from "react-native-maps";

import { theme } from "../../../core";
import { MarkerInfo } from "../../MarkerInfo";
import { ButtonIcon, PageView } from "../../uiKit";

type LocationsScreenProps = {
	markers: MarkerProps[];
	setMarkers: React.Dispatch<React.SetStateAction<MarkerProps[]>>
}

export const LocationsScreen: React.FC<LocationsScreenProps> = (
	{
		markers, 
		setMarkers
	}) => {

	const onDeleteAllPress = () => {
		Alert.alert(
			"Delete all locations",
			"Are you sure you want to delete all locations?",
			[
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						setMarkers([]);
					}
				},
				{
					text: "Oops",
					style: "cancel"
				}
			]
		);
	};

	const emptyComponent = () => {
		return (
			<View style={styles.centeredContainer}>
				<Text style={styles.text}>{"You don't have any locations yet."}</Text>
				<Text style={styles.text}>{"Go to \"Add locations\" screen to add some!"}</Text>
			</View>
		);
	};

	const headerComponent = () => {
		return (
			<View style={styles.headerInnerContainer}>
				<Text style={styles.text}>{"List of locations"}</Text>
				<ButtonIcon 
					iconName="trash"
					color={theme.colors.error}
					size={22}
					onPress={onDeleteAllPress}
				/>
			</View>
		);
	};

	return (
		<PageView dark>
			<FlatList
				contentContainerStyle={!markers.length ? styles.centeredContainer : undefined}
				alwaysBounceVertical={false}
				ItemSeparatorComponent={() => {
					return <View style={styles.separator}/>;
				}}
				ListEmptyComponent={emptyComponent}
				ListHeaderComponent={markers.length ? headerComponent : undefined}
				ListHeaderComponentStyle={styles.headerContainer}
				stickyHeaderIndices={[0]} // Makes the internal header sticky, as it's on index 0
				data={markers}
				renderItem={({ item: marker }) => {
					return <MarkerInfo marker={marker} />;
				}}
				keyExtractor={(marker) => `${marker.coordinate.latitude}-${marker.coordinate.longitude}`}
			/>
		</PageView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		paddingHorizontal: 16,
		marginBottom: 8,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.lightAccent
	},
	headerInnerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 20,
		lineHeight: 24,
		color: theme.colors.white,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	separator: {
		flex: 1,
		height: 1,
		marginVertical: 8,
		backgroundColor: theme.colors.lightGray
	}
});