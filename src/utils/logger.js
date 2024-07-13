import * as Sentry from "@sentry/react-native";

export const logger = async (msg, level, ...args) => {
    const shouldLogToSentry = process.env.EAS_BUILD && level === 'e';
    const localEASBuild = process.env.EXPO_PUBLIC_EAS_BUILD && level === 'e';
    if (shouldLogToSentry || localEASBuild ) {
        Sentry.captureException(args[0]); 
    }
    if(!process.env.EAS_BUILD){
        if(level ==='e'){
            console.error(msg, ...args);
        } else {
            console.log(msg, ...args);
        }
    }
  };

  // file - func - msg. V: 


  