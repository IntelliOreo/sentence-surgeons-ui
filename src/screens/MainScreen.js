// src/screens/MainScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MessageInput from '../components/MessageInput';
import { sendMessageToLambda } from '../api/lambda';
import { globalStyles, COLORS, FONTS, FONT_SIZES } from '../styles/globalStyles';
import { AuthContext } from '../context/auth/AuthContext';
import { MessageHistoryContext } from '../context/messageHistory/MessageHistoryContext';

export default function MainScreen({ route }) {
  const {user, isSignedIn } = useContext(AuthContext);
  const { addConversation } = useContext(MessageHistoryContext);

  let name;
  if (isSignedIn){
    console.log('user in main screen', user);
    console.log('isSignedIn in main screen', isSignedIn);
    name = user.name;
  } else if(route.params && route.params.name){
    name = route.params.name;
  } else {
    name = 'Anonymous';
  }
  
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');

  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
  };

  const handleShowResult = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult('');
  };

  const handleSendMessage = async () => {
    try {
      const response = await sendMessageToLambda(message, addConversation);
      setResults((prevResults) => [response, ...prevResults.slice(0, 2)]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setResults((prevResults) => ['An error occurred. Please try again.', ...prevResults.slice(0, 2)]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hello, {name}!</Text>
        <Text style={styles.instruction}>Let's work on it</Text>

        <MessageInput
          message={message}
          setMessage={handleMessageChange}
          onSend={handleSendMessage}
        />

        <ScrollView 
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
          keyboardShouldPersistTaps="handled"
        >
          {results.map((result, index) => (
            <Pressable
              key={index}
              onPress={() => handleShowResult(result)}
            >
              <Text style={[styles.result, index > 0 && styles.oldResult]} numberOfLines={3} ellipsizeMode="tail">
                {result}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{selectedResult}</Text>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    ...globalStyles.primaryText,
    fontSize: FONT_SIZES.large,
    marginBottom: 20,
  },
  instruction: {
    ...globalStyles.secondaryText,
    fontSize: FONT_SIZES.medium,
    color: 'black',
    marginBottom: 20,
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20, // Add some space between the input and results
  },
  resultsContent: {
    flexGrow: 1,
  },
  result: {
    ...globalStyles.secondaryText,
    fontSize: FONT_SIZES.medium,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    color: COLORS.primary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  oldResult: {
    ...globalStyles.secondaryText,
    color: COLORS.oldResult,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    ...globalStyles.secondaryText,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});