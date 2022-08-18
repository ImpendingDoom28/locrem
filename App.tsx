import React from "react";

// Components
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./src/components/navigators";

// Styles

const App = () => {

	return (
		<NavigationContainer>
			<StatusBar 
				style={"auto"} 
				animated
				networkActivityIndicatorVisible
			/>
			<TabNavigator/>
		</NavigationContainer>
	);
};

export default App;