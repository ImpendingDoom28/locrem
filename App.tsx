import React from 'react';

// Components
import { 
  StyleSheet, 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/components/navigators/TabNavigator/TabNavigator';

// Styles
import { theme } from './src/core/theme/theme';

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;