import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, TextInput, Dimensions, Button, Platform, KeyboardAvoidingView } from "react-native";
import { LatLng, MarkerProps } from "react-native-maps";
import { theme } from "../../../core";
import { ButtonIcon } from "../../uiKit";

type MarkerFormModalProps = {
  modalVisible: boolean,
  markerCoordinate: LatLng | undefined,
  setMarkers: React.Dispatch<React.SetStateAction<MarkerProps[]>>, 
  setModalVisible: (value: boolean) => void,
}

export const MarkerFormModal: React.FC<MarkerFormModalProps> = (
	{
		modalVisible,
		setModalVisible,
		markerCoordinate,
		setMarkers,
	}) => {

	const [shouldClearAgain, setShouldClearAgain] = useState<boolean>(true);
	const [markerTitle, setMarkerTitle] = useState<string>("New place");

	const closeModal = () => {
		setModalVisible(false);
	};
	const resetModal = () => {
		setMarkerTitle("New place");
	};

	const onLocationNameChange = () => {
		setShouldClearAgain(false);
	};
	const onSaveButtonPress = () => {
		if(markerCoordinate) {
			setMarkers((prevMarkers) => [
				...prevMarkers, 
				{
					coordinate: markerCoordinate,
					title: markerTitle,
					draggable: true,
				}
			]);
			closeModal();
			resetModal();
		}
	};

	return (
		<Modal
			animationType="slide"
			presentationStyle={Platform.OS === "ios" ? "pageSheet" : undefined}
			transparent={Platform.OS === "ios" ? false : true}
			visible={modalVisible}
			onRequestClose={closeModal}
		>
			{Platform.OS === "android" && <View style={styles.backgroundView} />}
			<KeyboardAvoidingView 
				behavior={Platform.OS === "ios" ? "padding" : "height" }
				style={styles.centeredView}
			>
				<View style={styles.modalView}>
					{
						Platform.OS === "android" && (
							<View style={styles.closeButtonView}>
								<ButtonIcon
									iconName="close-outline"
									color={"white"}
									size={40}
									onPress={closeModal}
								/>
							</View> 
						)
					}
					<View style={styles.modalBodyView}>
						<View style={styles.headerView}>
							<Text style={styles.headerText}>{"Adding new location"}</Text>
						</View>
						<View style={styles.inputView}>
							<Text style={styles.label}>{"Enter location name:"}</Text>
							<TextInput
								clearTextOnFocus={shouldClearAgain}
								enablesReturnKeyAutomatically
								clearButtonMode={"while-editing"}
								onChangeText={setMarkerTitle}
								onChange={onLocationNameChange}
								style={styles.textInput}
								value={markerTitle}
							/>
						</View>
						<View style={styles.buttonView}>
							<Button 
								title="Save" 
								color={theme.colors.lightAccent}
								onPress={onSaveButtonPress}
							/>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	closeButtonView: {
		position: "absolute",
		zIndex: 10,
		right: -36,
		top: -36
	},
	backgroundView: {
		backgroundColor: theme.colors.backgroundColor,
		opacity: 0.5,
		flex: 1
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
		color: theme.colors.white
	},
	label: {
		fontSize: 16,
		marginBottom: 4,
		color: theme.colors.white
	},
	textInput: {
		fontSize: 16,
		borderBottomWidth: 1,
		paddingBottom: 8,
		paddingTop: 8,
		borderBottomColor: theme.colors.accent,
		color: theme.colors.white,
	},
	centeredView: {
		flex: 1,
		backgroundColor: theme.colors.backgroundColor,
	},
	modalView: {
		flex: 1,
		backgroundColor: theme.colors.backgroundColor,
		padding: 24,
	},
	modalBodyView: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	buttonView: {
		position: "absolute",
		width: "100%",
		bottom: 40,
		justifyContent: "flex-end",
	},
	inputView: {
		marginTop: 16
	},
	headerView: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
});