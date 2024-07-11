import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from './../context/auth/AuthContext';
import { MessageHistoryContext } from '../context/messageHistory/MessageHistoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SummaryScreen({ navigation }) {
  const { isSignedIn, user } = useContext(AuthContext);
  const { conversations } = useContext(MessageHistoryContext);
  const [allStorageData, setAllStorageData] = useState('');

  useEffect(() => {
    const fetchAllStorageData = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const allData = await AsyncStorage.multiGet(allKeys);
        setAllStorageData(JSON.stringify(allData, null, 2));
      } catch (error) {
        console.error('Error fetching AsyncStorage data:', error);
      }
    };

    fetchAllStorageData();
  }, []);

  if (!isSignedIn) {
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

  // 
  // if(!user){
  //   return(
  //     <View><Text>{allStorageData}</Text></View>
  //   )
  // }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Summary for {user.email}</Text>
      
      <Text style={styles.sectionTitle}>Your Conversations:</Text>
      {conversations.map((conv, index) => (
        <View key={conv.id} style={styles.conversationItem}>
          <Text style={styles.conversationText}>User Input: {conv.userInput}</Text>
          <Text style={styles.conversationText}>API Response: {conv.apiResponse}</Text>
          <Text style={styles.conversationText}>Timestamp: {new Date(conv.timestamp).toLocaleString()}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>AsyncStorage Contents:</Text>
      <Text style={styles.storageText}>{allStorageData}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  conversationItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  conversationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  storageText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});
