import * as Sentry from "@sentry/react-native";

export const logger = async (message, logLevel, ...additionalArgs) => {
    const isEasBuild = process.env.EXPO_PUBLIC_EAS_BUILD;
    const isErrorLevel = logLevel === 'e';

    if (isEasBuild) {
        if (isErrorLevel) {
          Sentry.captureException(additionalArgs[0]);
        } else {
            // let argsArray = [];
            // if (additionalArgs.length > 0) {
            //   argsArray = [...additionalArgs];
            //   argsArray = argsArray.map( arg => JSON.stringify(arg) );
            // }
            // Sentry.captureMessage(`${message} ${argsArray.join(' ')}`);
        }
    } else if (isErrorLevel){
        console.error(message, ...additionalArgs);
    } else {
        console.log(message, ...additionalArgs);
    }
  };

  // file - func - msg. V: 


  