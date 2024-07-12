import * as Network from 'expo-network';
import { logger } from './log';

export const isConnected = async () => {
  let { isInternetReachable } = await Network.getNetworkStateAsync();
  logger(`isInternetReachable -`,'', isInternetReachable);
  return isInternetReachable;
};



