import React, { createContext, useState, useEffect } from 'react';
import { logger } from '../../utils/log';

export const RateLimitContext = createContext();

export const RateLimitProvider = ({ children }) => {
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastResetTime, setLastResetTime] = useState(null);

  // Reset the API call count every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setApiCallCount(0);
      setLastResetTime(new Date());
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(interval);
  }, []);

  const incrementApiCallCount = () => {
    setApiCallCount((prevCount) => prevCount + 1);
    logger(`Rate limit Context. apiCallCount: ${apiCallCount}`);
  };

  const isRateLimited = apiCallCount >= 5;

  return (
    <RateLimitContext.Provider
      value={{ apiCallCount, lastResetTime, incrementApiCallCount, isRateLimited }}
    >
      {children}
    </RateLimitContext.Provider>
  );
};
