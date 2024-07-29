import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
/* eslint-disable no-unused-vars */
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
import {
  get,
  getDatabase,
  ref,
  set,
  push,
  update,
  onValue,
  remove,
} from "firebase/database";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_APP_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGESENDER_ID,
  appId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  measurementId: import.meta.env.VITE_APP_APP_DOMAIN,
  databaseURL: "https://avatarbot2-a45a7-default-rtdb.firebaseio.com/",
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
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
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [room, setRoom] = useState(false);
  const [cabinOpen, setCabinOpen] = useState(false);
  const [allCabinDeviceData, setAllCabinDeviceData] = useState({});
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [currentCabinName, setCurrentCabinName] = useState("");
  const [childNodeFlag, setChildlNodeFlag] = useState(false);
  const [roomFlag, setRoomFlag] = useState(false);
  const [cabinFlag, setCabinFlag] = useState(false);
  const [openEditCabin, setOpenEditCabin] = useState(false);
  const [onPageHandler, setOnPageHandler] = useState("");
  const [cabinId, setCabinId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditDevice,setOpenEditDevice]=useState(false);
  const [deviceFlag,setDeviceFlag]=useState(false);
  /***---------------------------------------------------------------------------------------- */
  const [fanSpeed, setFanSpeed] = useState("Low");
  /**----------------------------------------------------------------------------------------- */
  const signUpUserUsingEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signInUserUsingEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signUpWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
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

  /**---------------------------STATES FOR ROOM------------------------------------------------------------------------------- */
  const handleRoomOpen = () => {
    setRoom(true);
  };
  const handleRoomClose = () => {
    setRoom(false);
  };
  const saveRoomForm = async (roomName) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const dbRef = ref(firebaseDatabase, `${username}`);
    let data1 = {
      rooms: { room: roomName },
    };
    try {
      await push(dbRef, data1);
      setRoomFlag((prevState) => !prevState);
    } catch (error) {
      console.log(error.message);
    }
  };
  const roomsAdded = async () => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}`;
    const dbRef = ref(firebaseDatabase, path);
    try {
      let data = {
        rooms: { room: "Kitchen" },
      };
      await push(dbRef, data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeRoom = async (roomId) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}`;
    const dbRef = ref(firebaseDatabase, path);
    try {
      await remove(dbRef);
      setRoomFlag((prevState) => !prevState);
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateRoom = async (roomId, roomName) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}/rooms`;
    const dbRef = ref(firebaseDatabase, path);
    let data = {
      room: roomName,
    };
    try {
      await update(dbRef, data);
      setRoomFlag((prevState) => !prevState);
    } catch (error) {
      console.log(error.message);
    }
  };
  /**---------------------------States For Particular Cabin Cabin--------------------------------------------------------------- */
  const saveCabinForm = async (data, roomId) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}/rooms`;
    const dbRef = ref(firebaseDatabase, path);
    const data1 = {
      ...data,
    };
    try {
      await push(dbRef, data1);
      setCabinFlag(!cabinFlag);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCabinOpen = () => {
    setCabinOpen(true);
  };
  const handleCabinClose = () => {
    setCabinOpen(false);
  };
  const updateCabinName = async (roomId, cabinId, cabinName) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}/rooms/${cabinId}`;
    console.log(path);
    const dbRef = ref(firebaseDatabase, path);
    let data = {
      boardName: cabinName,
    };
    try {
      update(dbRef, data);
      setCabinFlag(!cabinFlag);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteCabinName = async (roomId, cabinId, cabinName) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}/rooms/${cabinId}`;
    console.log(path);
    console.log(path);
    const dbRef = ref(firebaseDatabase, path);
    try {
      remove(dbRef);
      setCabinFlag(!cabinFlag);
    } catch (error) {
      console.log(error.message);
    }
  };
  /**----------------------------State And Function  For Devices-------------------------------------------------------------------------------------- */

  /**-----------------------------Change the state Boards------------------------------------------------------- */

  /**these function are reference */
  const snapShotValueOfChildNode = async (deviceName) => {
    return new Promise((resolve, reject) => {
      const email = user.email;
      const username = email.substring(0, email.indexOf("@"));
      const path = `${username}/${roomId}/rooms/${cabinId}/${deviceName}/fanState`;
      const dbRef = ref(firebaseDatabase, path);
      onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();
          let dataObject = [
            {
              fanState: data,
              deviceName: deviceName,
            },
          ];
          resolve(dataObject);
        },
        (error) => {
          console.error("Error fetching data:", error);
          reject(error);
        }
      );
      setChildlNodeFlag((prevState) => !prevState);
    });
  };
  const snapShotValueOfPowerState = async (deviceName) => {
    return new Promise((resolve, reject) => {
      const email = user.email;
      const username = email.substring(0, email.indexOf("@"));
      const path = `${username}/${username}/room/${roomId}/${currentCabinName}/${deviceName}/powerState`;
      const dbRef = ref(firebaseDatabase, path);
      onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();
          let dataObject = [
            {
              powerState: data,
              deviceName: deviceName,
            },
          ];
          resolve(dataObject);
        },
        (error) => {
          console.error("Error fetching data:", error);
          reject(error);
        }
      );
      setChildlNodeFlag((prevState) => !prevState);
    });
  };
  /**these function are for reference */
  const updateTheRealtimeDataBase = async (deviceName, values) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}/rooms/${cabinId}/boards/${deviceName}`;
    console.log(path);
    const dbRef = ref(firebaseDatabase, path);
    try {
      await update(dbRef, values);
      setChildlNodeFlag((prevState) => !prevState);
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateFanSpeedDatabase = async (deviceName) => {
    return new Promise((resolve, reject) => {
      const email = user.email;
      const username = email.substring(0, email.indexOf("@"));
      const path = `${username}/${roomId}/rooms/${cabinId}/boards/${deviceName}`;
      console.log(path);
      onValue(
        ref(firebaseDatabase, path),
        (snapshot) => {
          const data = snapshot.val();
          // let dataObject = [
          //   {
          //     fanSpeed: data,
          //     deviceName: deviceName,
          //   },
          // ];
          resolve(data);
        },
        (error) => {
          console.error("Error fetching data:", error);
          reject(error);
        }
      );
    });
  };
  
  // console.log(allCabinDeviceData);
 /**------------------------------Devices Edit and Delete Functions------------------------------------------------------------------------------- */
  const deleteDevice = async (deviceName) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `${username}/${roomId}/rooms/${cabinId}/${deviceName}`;
    const dbRef = ref(firebaseDatabase, path);
    try {
      await remove(dbRef);
      setChildlNodeFlag((prevState) => !prevState);
    } catch (error) {
      console.log(error.message);
    }
  };
   
  const openDeviceDrawer=()=>{
    setOpenEditDevice(true)
  }

  const closeDeviceDrawer=()=>{
    setOpenEditDevice(false)
  }

  /**-------------------------------------------------------------------------------------------------- */
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
        /***--------remove it after the project------------- */
        // handleAddCabinOpen,
        // handleAddCabinClose,
        /**----------CABIN STATES START FROM BELOW----------- */
        setFormsToGenerate,
        formsToGernerate,
        addCabinFormData,
        setAddCabinFormData,
        setCurrentStep,
        currentStep,
        //addCabinInCurrentCabin,
        signUpWithGoogle,
        setRoom,
        room,
        handleRoomOpen,
        handleRoomClose,
        saveRoomForm,
        saveCabinForm,
        setCabinFlag,
        cabinFlag,
        //variable of cabin open and close
        setCabinOpen,
        cabinOpen,
        //variable of cabin open and close
        handleCabinOpen,
        handleCabinClose,

        setAllCabinDeviceData,
        allCabinDeviceData,
        //DEVICE IMFORMATION
        setRoomId,
        roomId,
        setRoomName,
        roomName,
        currentCabinName,
        setCurrentCabinName,
        /**------FAN DEVICE STATE---------- */
        setFanSpeed,
        fanSpeed,
        updateTheRealtimeDataBase,
        snapShotValueOfChildNode,
        snapShotValueOfPowerState,
        setChildlNodeFlag,
        childNodeFlag,
        setRoomFlag,
        roomFlag,
        /**--------EDIT AND DELETE DEVICES---------- */
        openDeviceDrawer,
        closeDeviceDrawer,
        setOpenEditDevice,
        openEditDevice,
        /**---------------- */
        onPageHandler,
        setOnPageHandler,
        roomsAdded,
        removeRoom,
        updateRoom,

        /*-------cabin Edit States----------**/
        setOpenEditCabin,
        openEditCabin,
        updateCabinName,
        setCabinId,
        cabinId,
        deleteCabinName,
        setOpenDelete,
        openDelete,
        /**-------------------------------- */
        updateFanSpeedDatabase,
        deleteDevice,
        
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
// try {
//   const snapshot = await get(dbRef);
//   if (snapshot.exists()) {
//     return snapshot.val();
//   } else {
//     console.log("No data available");
//     return [];
//   }
// } catch (error) {
//   console.error("Error getting data from database:", error);
//   return null;
// }
//console.log(addCabinFormData);
/**------------------------------------------------------------------------------------------------- */
//  const handleAddRoomOpen= ()=>{
//   setAddRoom(true);
//  }
//  const handleAddRoomClose=()=>{
//    setAddRoom(false);
//  }
// handleAddRoomOpen,
// handleAddRoomClose,
// addRoom,
// setAddRoom,
