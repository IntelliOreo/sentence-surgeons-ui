import { Header } from '@react-navigation/stack';
import axios from 'axios';
import { logger } from '../utils/logger';

 const LAMBDA_URL = `${process.env.EXPO_PUBLIC_LAMDA_URL}/chat`;

export async function sendMessageToLambda(userInput, addConversation) {
  logger('Sending user input to Lambda:','', userInput);
  
  try {
    const payload = {
      prompt: userInput,
      previous_messages: []
    };

    const response = await axios.post(LAMBDA_URL, payload, { headers: {
      'identifier': 'dummy'
    }});
    logger('adding conversation,', '', userInput, response.data.assistant_message);
    addConversation(userInput, response.data.assistant_message);
    return response.data.assistant_message;
  } catch (error) {
    logger('sendMessageToLambda - error: ', 'e', error);
    throw error;
  }
}