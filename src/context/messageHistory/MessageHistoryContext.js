import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const MessageHistoryContext = createContext({
  conversations: [],
  addConversation: () => {},
  clearHistory: () => {},
});

const MAX_CONVERSATIONS = 10;

export const MessageHistoryProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const { isSignedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (isSignedIn && user) {
      loadConversations();
      console.log('conversations loaded - in MessageHistoryProvider', conversations);
    } else {
      setConversations([]);
      console.log('conversations cleared - in MessageHistoryProvider', conversations);
    }
  }, [isSignedIn, user]);

  const loadConversations = async () => {
    try {
      const storedConversations = await AsyncStorage.getItem(`conversations_${user.email}`);
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations));
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const addConversation = useCallback(async (userInput, apiResponse) => {
    if (isSignedIn && user) {
      const newConversation = {
        id: Date.now().toString(),
        userInput,
        apiResponse,
        timestamp: Date.now()
      };
      const updatedConversations = [newConversation, ...conversations].slice(0, MAX_CONVERSATIONS);
      setConversations(updatedConversations);
      console.log('conversations added - in MessageHistoryProvider', updatedConversations);
      try {
        await AsyncStorage.setItem(`conversations_${user.email}`, JSON.stringify(updatedConversations));
      } catch (error) {
        console.error('Error saving conversations:', error);
      }
    }
  }, [conversations, isSignedIn, user]);

  const clearHistory = useCallback(async () => {
    setConversations([]);
    if (isSignedIn && user) {
      try {
        await AsyncStorage.removeItem(`conversations_${user.email}`);
      } catch (error) {
        console.error('Error clearing conversations:', error);
      }
    }
  }, [isSignedIn, user]);

  return (
    <MessageHistoryContext.Provider value={{ conversations, addConversation, clearHistory }}>
      {children}
    </MessageHistoryContext.Provider>
  );
};


// Message structure
// {
//   id: string,
//   userInput: string,
//   apiResponse: string,
//   timestamp: number
// }
