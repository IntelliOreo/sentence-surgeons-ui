import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';

export default function SummaryScreen({ navigation }) {
  const { isSignedIn } = useContext(AuthContext);

  if (!isSignedIn) {
    // If the user is not logged in, redirect to the LogInScreen
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You need to log in to view the summary.</Text>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('LogIn')}
        />
      </View>
    );
  }

  // If the user is logged in, show the summary
  console.log('isSignedIn - in summary.js', isSignedIn);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <Text>This is the summary page.</Text>
      {/* Add your summary content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
