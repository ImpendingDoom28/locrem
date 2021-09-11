import React from 'react';

// Components
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocationsScreen from '../../screens/LocationsScreen/LocationsScreen';
import AddLocationScreen from '../../screens/AddLocationScreen/AddLocationScreen';

const { Navigator, Screen} = createBottomTabNavigator();

const TabNavigator = () => {
	const defaultScreenOptions = {headerShown: false};

	return (
		<Navigator 
			initialRouteName={"locations"}
		>
			<Screen 
				name={"locations"} 
				component={LocationsScreen} 
				options={defaultScreenOptions}
			/>
			<Screen 
				name={"add location"} 
				component={AddLocationScreen} 
				options={defaultScreenOptions}
			/>
		</Navigator>
	);
}

export default TabNavigator;