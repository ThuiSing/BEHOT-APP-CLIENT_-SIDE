import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const firebaseInitialize = () => {
  return initializeApp(firebaseConfig);
};
export default firebaseInitialize;
