import { useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import firebaseInitialize from "../../firebase/firebaseInitialize";

firebaseInitialize();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [logInError, setLogInError] = useState("");
  const [RegisterError, setRegisterError] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
    return () => unSubscribe();
  }, [auth]);

  const emailRegister = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              setUser(user);
            })
            .catch((error) => {
              setRegisterError(error.message);
            });
          setUser(user);
        }
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };
  const LoginEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        setLogInError(error.message);
      });
  };
  const loggedOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    user,
    emailRegister,
    loggedOut,
    LoginEmail,
    logInError,
    setLogInError,
    RegisterError,
    setRegisterError,
  };
};
export default useFirebase;
