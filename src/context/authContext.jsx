import { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase/firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
