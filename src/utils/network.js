import * as Network from 'expo-network';

export const isConnected = async () => {
  let { isInternetReachable } = await Network.getNetworkStateAsync();
  console.log('isInternetReachable', isInternetReachable);
  return isInternetReachable;
};
