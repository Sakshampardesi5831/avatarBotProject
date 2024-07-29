/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import {} from "@mui/icons-material";
import { Box, Typography, TextField, Switch, Button } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
const DynamicDevice = () => {
  const firebase = useFirebase();
  const formsToFill = firebase.formsToGernerate;
  const currentStep = firebase.currentStep;
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const addCabinFormData = firebase.addCabinFormData;
  const [dynamicDevice, setDynamicDevice] = useState("");
  const [isFanDevice, setIsFanDevice] = useState("No");
  const setBoardForm = firebase.setBoardForm;
  const handleconfimationPage = async (e) => {
    e.preventDefault();
    let newData = {};

    if (checked) {
      newData = {
        [`A${currentStep}`]: {
          deviceName: dynamicDevice,
          isFan: true,
          fanSpeed: "Low",
          power: "Off",
          fanState: "Low",
          powerState: "Off",
        },
      };
    } else {
      newData = {
        [`D${currentStep}`]: {
          deviceName: dynamicDevice,
          power: 0,
          isFan: false,
          powerState: 0,
        },
      };
    }
    // firebase.setAddCabinFormData({
    //   ...addCabinFormData,
    //   [addCabinFormData.cabinName]: {
    //     ...addCabinFormData[addCabinFormData.cabinName],
    //     ...newData,
    //   },
    // });
    const myPrevObject = firebase.addCabinFormData;
    myPrevObject.boards = {
      ...myPrevObject.boards,
      ...newData,
    };
    //console.log(myPrevObject);
    firebase.setAddCabinFormData(myPrevObject);
    setDynamicDevice("");
    setChecked(false);
    setIsFanDevice("No");
    setBoardForm("confirmation");
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) setIsFanDevice("Yes");
    else setIsFanDevice("No");
  };

  const dialogCloseHandler = () => {
    firebase.handleCabinClose();
    firebase.setFormsToGenerate(0);
    firebase.setCurrentStep(0);
  };
  const handleNextForm = (e) => {
    e.preventDefault();
    if (dynamicDevice.length === 0) {
      setError(true);
      return;
    }
    if (currentStep == 1) {
      let newData = {};
      if (checked) {
        newData = {
          boards: {
            [`A${currentStep}`]: {
              deviceName: dynamicDevice,
              isFan: true,
              fanSpeed: "Low",
              power: "Off",
              fanState: "Low",
              powerState: "Off",
            },
          },
        };
      } else {
        /*newData = {
          [addCabinFormData.cabinName]: {
            [`D${currentStep}`]: {
              deviceName: dynamicDevice,
              power: 0,
              isFan: false,
              powerState: 0,
            },
          },
        };*/
        newData = {
          boards: {
            [`D${currentStep}`]: {
              deviceName: dynamicDevice,
              power: 0,
              isFan: false,
              powerState: 0,
            },
          },
        };
      }
      const mergedFormData = { ...addCabinFormData, ...newData };
      console.log(mergedFormData);
      firebase.setAddCabinFormData(mergedFormData);
      setDynamicDevice("");
      setChecked(false);
      setIsFanDevice("No");
      firebase.setCurrentStep(currentStep + 1);
      const setBoardForm = firebase.setBoardForm;
      setBoardForm("dynamicDevice");
    } else {
      let newData = {};

      if (checked) {
        newData = {
          [`A${currentStep}`]: {
            deviceName: dynamicDevice,
            isFan: true,
            fanSpeed: "Low",
            power: "Off",
            fanState: "Low",
            powerState: "Off",
          },
        };
      } else {
        newData = {
          [`D${currentStep}`]: {
            deviceName: dynamicDevice,
            power: 0,
            isFan: false,
            powerState: 0,
          },
        };
      }
      /*firebase.setAddCabinFormData({
        ...addCabinFormData,
        [addCabinFormData.cabinName]: {
          ...addCabinFormData[addCabinFormData.cabinName],
          ...newData,
        },
      });*/
      const myPrevObject = firebase.addCabinFormData;
      console.log(myPrevObject);
      myPrevObject.boards = {
        ...myPrevObject.boards,
        ...newData,
      };
      //console.log(myPrevObject);
      firebase.setAddCabinFormData(myPrevObject);
      setDynamicDevice("");
      setChecked(false);
      setIsFanDevice("No");
      setBoardForm("dynamicDevice");
      firebase.setCurrentStep(currentStep + 1);
    }
  };
  const renderButton = () => {
    return currentStep < formsToFill ? (
      <Button
        className="button"
        sx={{
          padding: "10px 20px",
          backgroundColor: "#f9c20f",
          color: "#fff",
        }}
        onClick={(e) => handleNextForm(e)}
      >
        Next
      </Button>
    ) : (
      <Button
        className="button"
        sx={{
          padding: "10px 20px",
          backgroundColor: "#f9c20f",
          color: "#fff",
        }}
        onClick={(e) => handleconfimationPage(e)}
      >
        Go to Confirmation page
      </Button>
    );
  };
  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "700" }}>
          Enter Device {currentStep} Name
        </Typography>
        <TextField
          sx={{ width: "100%", marginTop: "20px" }}
          placeholder="Enter the First Device Name"
          onChange={(e) => setDynamicDevice(e.target.value)}
          value={dynamicDevice}
        />
        <Box
          sx={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Is This is Fan Device</Typography>
          <Switch
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: "#f9c20f",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "#000000 !important",
              },
            }}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography
            variant="body1"
            color={isFanDevice == "No" ? "red" : "green"}
          >
            {isFanDevice}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ padding: "10px 20px", backgroundColor: "red", color: "#fff" }}
            onClick={() => dialogCloseHandler()}
          >
            close
          </Button>
          {renderButton()}
        </Box>
        {/* <Typography variant="body1" sx={{ fontWeight: "700", color: "#000" }}>
          You can Register Only 5 devices to every cabin
        </Typography> */}
      </Box>
    </Fragment>
  );
};

export default DynamicDevice;
