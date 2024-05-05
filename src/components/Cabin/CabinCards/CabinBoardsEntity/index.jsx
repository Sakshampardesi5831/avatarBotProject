/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { useFirebase } from "../../../../context/Firebase";
import { Box, Typography, Button, IconButton, Switch } from "@mui/material";
import {
  TipsAndUpdates,
  Lightbulb,
  Add,
  Remove,
  Edit,
  Delete,
} from "@mui/icons-material";
import EditDevices from "../../../Device/EditDevice";

const CabinBoardsEntity = ({ deviceData, deviceName }) => {
  const [fanDeviceState, setFanDeviceState] = useState("");
  const [checked, setChecked] = useState(false);
  const [fanSpeed, setFanSpeed] = useState("Low");
  const [fanPower, setFanPower] = useState("Off");
  const [switchPower, setSwitchPower] = useState("Off");
  const [currentFanState, setCurrentFanState] = useState("");
  const firebase = useFirebase();
  const roomId = firebase.roomId;
  const cabinId = firebase.cabinId;
  console.log("roomId", roomId);
  console.log("cabinId", cabinId);
  const openEditDevice=firebase.openEditDevice;
const toggleDrawer=()=>{
  setOpenEditDevice(!openEditDevice);
}
  //const fanSpeed = firebase.fanSpeed;
  const childNodeFlag = firebase.childNodeFlag;
  const setOpenEditDevice=firebase.setOpenEditDevice;
  if (!deviceData) return null;
  const updateFanSpeed = async () => {
    if (fanSpeed == "Low") {
      setFanSpeed("Medium");
    } else if (fanSpeed == "Medium") {
      setFanSpeed("High");
    } else if (fanSpeed == "High") {
      setFanSpeed("Low");
    }
    let data = {
      ["fanSpeed"]: fanSpeed,
    };
    const updateValues = await firebase.updateTheRealtimeDataBase(
      deviceName,
      data
    );
    setFanSpeed("Low");
    console.log(updateValues);
  };
  const updateFanSpeedBack = async () => {
    if (fanSpeed == "High") {
      setFanSpeed("Medium");
    } else if (fanSpeed == "Medium") {
      setFanSpeed("Low");
    } else if (fanSpeed == "Low") {
      setFanSpeed("Low");
    }
    let data = {
      ["fanSpeed"]: fanSpeed,
    };
    const updateValues = await firebase.updateTheRealtimeDataBase(
      deviceName,
      data
    );
    setFanSpeed("Low");
    console.log(updateValues);
  };
  const updateFanPower = async (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    if (!isChecked) {
      setFanPower("Off");
    } else {
      setFanPower("On");
    }

    let data = {
      power: isChecked ? "On" : "Off",
    };

    const updateValues = await firebase.updateTheRealtimeDataBase(
      deviceName,
      data
    );
    console.log(updateValues);
  };

  const updateSwitchPower = async (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    if (!isChecked) {
      setSwitchPower("Off");
    } else {
      setSwitchPower("On");
    }

    let data = {
      power: isChecked ? "On" : "Off",
    };

    const updateValues = await firebase.updateTheRealtimeDataBase(
      deviceName,
      data
    );
    console.log(updateValues);
  };

  const getUpdatedData = async () => {
    const getAllData = await firebase.updateFanSpeedDatabase(deviceName);
    setFanDeviceState(getAllData.fanSpeed);
    setCurrentFanState(getAllData.power);
    setSwitchPower(getAllData.power);
  };
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getUpdatedData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [childNodeFlag]);
  useEffect(() => {
    getUpdatedData();
  }, []);
  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          padding: "10px 5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {deviceData.isFan ? (
          <Box
            sx={{
              width: "100%",
              padding: "0px 5px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Switch
                checked={checked}
                onChange={(e) => {
                  updateSwitchPower(e);
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: "18px" }}>
                {fanPower}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <IconButton
                sx={{
                  padding: "5px",
                  backgroundColor: "#f9c20f",
                  color: "#000",
                  "&:hover": { backgroundColor: "#f9c20f" },
                }}
                onClick={() => updateFanSpeedBack()}
              >
                {<Remove />}
              </IconButton>

              <Typography sx={{ color: "#fff", fontSize: "15px" }}>
                {/* {deviceData.fanSpeed } */}
                {fanDeviceState == null ? fanSpeed : fanDeviceState}
              </Typography>
              <IconButton
                onClick={() => updateFanSpeed()}
                sx={{
                  padding: "5px",
                  backgroundColor: "#f9c20f",
                  color: "#000",
                  "&:hover": { backgroundColor: "#f9c20f" },
                }}
              >
                {<Add />}
              </IconButton>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",marginTop:"5px"}}>
              <Typography sx={{ color: "#fff" }}>
                Fan Speed: {deviceData.fanSpeed}
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                Power: {deviceData.powerState}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                padding: "5px",
                // border: "2px solid red",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
               onClick={()=>setOpenEditDevice(true)}
              sx={{backgroundColor:"#fff",color:"green" ,'&:hover':{backgroundColor:"#fff"}}}>
                <Edit />
              </IconButton>
              <IconButton  sx={{backgroundColor:"#fff",color:"red",'&:hover':{backgroundColor:"#fff"}}}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%", padding: "0px 10px" }}>
            <Box
              sx={{
                width: "100%",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {switchPower == "Off" ? (
                <Lightbulb sx={{ color: "#fff", fontSize: "40px" }} />
              ) : (
                <TipsAndUpdates sx={{ color: "#f7d64a", fontSize: "40px" }} />
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                padding: "10px",
                // border: "2px solid red",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Switch
                checked={checked}
                onChange={(e) => {
                  updateFanPower(e);
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: "18px" }}>
                {switchPower}
              </Typography>
            </Box>
            <Typography sx={{ color: "#fff" }}>
              Power State: {deviceData.powerState}
            </Typography>
            <Box
              sx={{
                width: "100%",
                padding: "5px",
                // border: "2px solid red",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",  
              }}
            >
              <IconButton  sx={{backgroundColor:"#fff",color:"green"}}>
                <Edit />
              </IconButton>
              <IconButton  sx={{backgroundColor:"#fff",color:"red"}}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      <EditDevices deviceName={deviceName} open={openEditDevice} onClose={toggleDrawer}/>
    </Fragment>
  );
};

export default CabinBoardsEntity;
