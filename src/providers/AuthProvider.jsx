import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   Observe the user state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User in the on auth state", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
