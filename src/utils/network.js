import * as Network from 'expo-network';
import { logger } from './logger';

export const isConnected = async () => {
  let { isInternetReachable } = await Network.getNetworkStateAsync();
  logger(`isInternetReachable -`,'', isInternetReachable);
  return isInternetReachable;
};



