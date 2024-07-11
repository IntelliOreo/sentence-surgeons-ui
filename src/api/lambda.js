import { Header } from '@react-navigation/stack';
import axios from 'axios';

 const LAMBDA_URL = `${process.env.EXPO_PUBLIC_LAMDA_URL}/chat`;

export async function sendMessageToLambda(userInput, addConversation) {
  console.log('Sending user input to Lambda:', userInput);
  
  try {
    const payload = {
      prompt: userInput,
      previous_messages: []
    };

    const response = await axios.post(LAMBDA_URL, payload, { headers: {
      'identifier': 'dummy'
    }});
    console.log('adding conversation', userInput, response.data.assistant_message);
    addConversation(userInput, response.data.assistant_message);
    return response.data.assistant_message;
  } catch (error) {
    console.error('Error calling Lambda function:', error, LAMBDA_URL);
    throw error;
  }
}