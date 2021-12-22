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
import axios from "axios";

firebaseInitialize();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [logInError, setLogInError] = useState("");
  const [RegisterError, setRegisterError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
    return () => unSubscribe();
  }, [user]);

  const emailRegister = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(email);
        savetoDB(email, name);
        const user = userCredential.user;
        if (user) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              setUser(user);
              setRegisterError("");
            })
            .catch((error) => {
              setRegisterError(error.message);
            });
          setUser(user);
          console.log(user);
          setRegisterError("");
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
        setLogInError("");
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

  const savetoDB = (email, name) => {
    const doc = { name, email };
    axios
      .post("https://fast-bayou-02347.herokuapp.com/users", doc)
      .then((res) => console.log(res));
  };

  // check admin
  useEffect(() => {
    axios
      .get(`https://fast-bayou-02347.herokuapp.com/users/${user.email}`)
      .then((res) => {
        setIsAdmin(res.data.isAdmin);
      });
  }, [user.email]);

  return {
    user,
    emailRegister,
    loggedOut,
    LoginEmail,
    logInError,
    setLogInError,
    RegisterError,
    setRegisterError,
    isAdmin,
  };
};
export default useFirebase;
