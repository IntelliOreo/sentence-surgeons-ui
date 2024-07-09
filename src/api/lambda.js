import axios from 'axios';
import Constants from 'expo-constants';

const LAMBDA_URL = `${Constants.expoConfig.extra.apiUrl}/chat`;

export async function sendMessageToLambda(userInput, addConversation) {
  console.log('Sending user input to Lambda:', userInput);
  
  try {
    const payload = {
      prompt: userInput,
      previous_messages: []
    };

    const response = await axios.post(LAMBDA_URL, payload);
    addConversation(userInput, response.data.assistant_message);
    return response.data.assistant_message;
  } catch (error) {
    console.error('Error calling Lambda function:', error);
    throw error;
  }
}