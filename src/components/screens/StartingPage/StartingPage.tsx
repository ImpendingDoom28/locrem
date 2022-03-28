import React from "react";

//Components
import { 
	Button, 
	Text, 
	View 
} from "react-native";

type StartingPageProps = {
	navigation: any
}

export const StartingPage: React.FC<StartingPageProps> = ({navigation}) => {
	return (
		<View>
			<Text>{"This is starting page"}</Text>
			<Button 
				title={"Go to home2"}
				onPress={() => { navigation.navigate("home2");}}
			>
				Start
			</Button>
		</View>
	);
};