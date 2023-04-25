// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVGqjTbz6pVaC0u3sOfZT86cy5Bv9AvAg",
  authDomain: "ecommerce-6fc98.firebaseapp.com",
  projectId: "ecommerce-6fc98",
  storageBucket: "ecommerce-6fc98.appspot.com",
  messagingSenderId: "602292309016",
  appId: "1:602292309016:web:96bb3e87075e507f38076d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider=({children})=>{
  const auth=useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth=()=>useContext(AuthContext);

//Defining custom hook for authentication
function useProvideAuth() {
  const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName });
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signOutUser = () => signOut(auth).then(() => setUser(null));
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => {
      unsubscribe();
    };
  });

  return{
    signIn,signUp,signOut:signOutUser,user
  }
}

export default AuthProvider;