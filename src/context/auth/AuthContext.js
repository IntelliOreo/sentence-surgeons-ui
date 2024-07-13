import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
   isSignedIn: false,
   user: null,
   setUser: () => {},
   setIsSignedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  

  // useEffect(() => {
  //   setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500); 
  //   }, []); 
  


  return (

    //  <AuthContext.Provider value={{ isSignedIn, user, setUser, setIsSignedIn }}>
    //    {isLoading ? <LoadingScreen /> : children} 
    //  </AuthContext.Provider>
    <AuthContext.Provider value={{ isSignedIn, user, setUser, setIsSignedIn }}>
     {children} 
    </AuthContext.Provider>
  );
};
