import * as Sentry from "@sentry/react-native";

export const logger = async (msg, level, ...args) => {
    console.log('in console.log')
    const shouldLogToSentry = process.env.EAS_BUILD && level === 'e';
    if (shouldLogToSentry) {
        Sentry.captureException(args[0]);
    } else {
        if(level ==='e'){
            console.error(msg, ...args);
        } else {
            console.log(msg, ...args);
        }
    }
  };

  // file - func - msg. V: 


  