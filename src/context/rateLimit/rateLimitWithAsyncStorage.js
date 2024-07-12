import { logger } from "../../utils/log";

export const isLimited = async () => {
  try {
    const conversationsString = await AsyncStorage.getItem('conversations');
        if (conversationsString) {
          const conversations = JSON.parse(conversationsString);
          if (conversations.length > 0) {
            const lastConversation = conversations[conversations.length - 1];
            const lastMessageTime = new Date(lastConversation.timestamp);
            const now = new Date();
            const minutesDiff = (now.getTime() - lastMessageTime.getTime()) / (1000 * 60);
      
            if (minutesDiff < RATE_LIMIT_PERIOD_MINUTES) {
              Alert.alert(
                'Rate Limit Reached',
                `Please wait ${RATE_LIMIT_PERIOD_MINUTES - minutesDiff} minutes before sending another message.`,
                [{ text: 'OK' }]
              );
              return;
            }
          }
        }
      
  } catch(error) {
    logger(`isLimited - rate limit func. Error:`, 'e', error);
  }
};
