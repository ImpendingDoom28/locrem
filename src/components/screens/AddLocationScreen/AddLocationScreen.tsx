import React from "react";
import { MarkerProps } from "react-native-maps";

// Components
import { MapComponent } from "../../MapComponent";

type AddLocationScreenProps = {
	markers: MarkerProps[];
	setMarkers: React.Dispatch<React.SetStateAction<MarkerProps[]>>
}


export const AddLocationScreen: React.FC<AddLocationScreenProps> = (props) => {
	return (
		<MapComponent {...props} />
	);
};