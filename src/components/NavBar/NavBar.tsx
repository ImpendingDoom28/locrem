import React from "react";

// Components
import { Button, SafeAreaView } from "react-native";

// Types
import { NavBarPageState } from "../../core/types/NavBarPageStates.type";

type NavBarProps = {
	changeView: (state: NavBarPageState) => void;
}

const NavBar: React.FC<NavBarProps> = (
	{
		changeView
	}) => {
	return (
		<SafeAreaView>
			<Button title={"xd"} onPress={() => {console.log("gay website");}}/>
		</SafeAreaView>
	);
};

export default NavBar;