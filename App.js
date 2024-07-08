import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import NameScreen from './src/screens/NameScreen';
import MainScreen from './src/screens/MainScreen';
import LogInScreen from './src/screens/LogInScreen';
import SummaryScreen from './src/screens/SummaryScreen';

import { 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  SafeAreaView, 
  StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'AmaticSC-Regular': require('./assets/fonts/AmaticSC-Regular.ttf'),
    'AmaticSC-Bold': require('./assets/fonts/AmaticSC-Bold.ttf'),
    'Bellefair-Regular': require('./assets/fonts/Bellefair-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
          <NavigationContainer>
            <Tab.Navigator initialRouteName="Name">
              <Tab.Screen name="Name" component={NameScreen} options={{ title: 'Welcome' }} />
              <Tab.Screen name="Main" component={MainScreen} options={{ title: 'LLM Chat' }} />
              {/* {isSignedIn ? (<Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Summary' }} />) : null} */}
              <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Summary' }} />
              <Stack.Screen name="LogIn" component={LogInScreen} options={{ title: 'Log In' }} />
            </Tab.Navigator>
          </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});