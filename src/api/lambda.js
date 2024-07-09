import axios from 'axios';

const LAMBDA_URL = 'http://localhost:8080/chat';

export async function sendMessageToLambda(userInput) {
  try {
    const payload = {
      prompt: userInput,
      previous_messages: []
    };

    const response = await axios.post(LAMBDA_URL, payload);
    return response.data.assistant_message;
  } catch (error) {
    console.error('Error calling Lambda function:', error);
    throw error;
  }
}