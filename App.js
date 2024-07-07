import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import NameScreen from './src/screens/NameScreen';
import MainScreen from './src/screens/MainScreen';
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Name">
              <Stack.Screen name="Name" component={NameScreen} options={{ title: 'Welcome' }} />
              <Stack.Screen name="Main" component={MainScreen} options={{ title: 'LLM Chat' }} />
            </Stack.Navigator>
          </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // or any color you prefer
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});