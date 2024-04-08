import { useState } from "react";
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_APP_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGESENDER_ID,
  appId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  measurementId: import.meta.env.VITE_APP_APP_DOMAIN,
  databaseURL:
    "https://avatarbot-6dd46-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [boardForm, setBoardForm] = useState("cabinform");

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  /*--------------------------------------------------------------------------------------------*/
  //Utiliy method
  const [cabinDialog, setCabinDialog] = useState(false);
  const [formsToGernerate, setFormsToGenerate] = useState(0);
  const [addCabinFormData, setAddCabinFormData] = useState({});
   const [currentStep,setCurrentStep]=useState(0);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const signUpUserUsingEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signInUserUsingEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signOutUser = () => {
    return signOut(firebaseAuth);
  };
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setAuthStatus(true);
      } else {
        setUser(null);
        setAuthStatus(false);
      }
    });
  }, []);
  const currentLoggedInUser = () => {
    const userLoggedIn = {
      user,
      authStatus,
    };

    return userLoggedIn;
  };
  const getDataFromDatabase = async (path) => {
    const dbRef = ref(firebaseDatabase, path);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return [];
      }
    } catch (error) {
      console.error("Error getting data from database:", error);
      return null;
    }
  };
  const getAllDataFromDatabase = async () => {
    const dbRef = ref(firebaseDatabase);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error getting data from database:", error);
      return null;
    }
  };

  const createTheTreeInDatabase = async (data) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const dbRef = ref(firebaseDatabase, `${username}`);

    const data1 = {
      [username]: {
        ...data,
      },
    };
    console.log(data1);
    try {
      await set(dbRef, data1);
    } catch (error) {
      console.log(error.message);
    }
  };
  const setTheValuesInTreeOfDataBase = async (path, values) => {
    const dbRef = ref(firebaseDatabase, path);
    try {
      await set(dbRef, values);
    } catch (error) {
      console.log(error.message);
    }
  };
 console.log(addCabinFormData);
  /**----------------------------------------------------------------------------------------------------- */
 
  const handleAddCabinOpen = () => {
    setCabinDialog(true);
  };
  const handleAddCabinClose = () => {
    setCabinDialog(false);
  };
  
  /**---------------------------------------------------------------------------------------------------------- */
  return (
    <FirebaseContext.Provider
      value={{
        signUpUserUsingEmailAndPassword,
        getDataFromDatabase,
        signInUserUsingEmailAndPassword,
        signOutUser,
        currentLoggedInUser,
        getAllDataFromDatabase,
        createTheTreeInDatabase,
        setTheValuesInTreeOfDataBase,
        open,
        handleDialogOpen,
        handleDialogClose,
        formData,
        setFormData,
        setBoardForm,
        boardForm,
        cabinDialog,
        setCabinDialog,
        handleAddCabinOpen,
        handleAddCabinClose,
        setFormsToGenerate,
        formsToGernerate,
        addCabinFormData,
        setAddCabinFormData,
        setCurrentStep,
        currentStep
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
