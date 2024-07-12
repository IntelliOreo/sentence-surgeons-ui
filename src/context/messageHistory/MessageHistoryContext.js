import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { logger } from '../../utils/log';

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
      logger(`conversations loaded - in MessageHistoryProvider. ${conversations}`);
    } else {
      setConversations([]);
      logger(`conversations cleared - in MessageHistoryProvider. ${conversations}`);
    }
  }, [isSignedIn, user]);

  const loadConversations = async () => {
    try {
      const storedConversations = await AsyncStorage.getItem(`conversations_${user.email}`);
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations));
      }
    } catch (error) {
      logger('MessageHistoryProvider. Error loading conversations: ','error', error);
    }
  };

  const addConversation = useCallback(async (userInput, apiResponse) => {
    if (isSignedIn && user) {
      const newConversation = {
        id: user + Date.now().toString(),
        userInput,
        apiResponse,
        timestamp: Date.now()
      };
      
      logger(`newConversation object created - in MessageHistoryProvider. ${newConversation.id}, ${newConversation.userInput}`);
      const updatedConversations = [newConversation, ...conversations].slice(0, MAX_CONVERSATIONS);
      setConversations(updatedConversations);
      logger(`conversations added - in MessageHistoryProvider ${updatedConversations}`);
      
      try {
        await AsyncStorage.setItem(`conversations_${user.email}`, JSON.stringify(updatedConversations));
      } catch (error) {
        logger('Error saving conversations in msgHistCxt:','error', error);
      }
    }
  }, [conversations, isSignedIn, user]);

  const clearHistory = useCallback(async () => {
    setConversations([]);
    if (isSignedIn && user) {
      try {
        await AsyncStorage.removeItem(`conversations_${user.email}`);
      } catch (error) {
        logger('Error clearing conversations:','error', error);
      }
    }
  }, [isSignedIn, user]);

  return (
    <MessageHistoryContext.Provider value={{ conversations, addConversation, clearHistory }}>
      {children}
    </MessageHistoryContext.Provider>
  );
};

