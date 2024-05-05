/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, Fragment } from "react";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import { toast } from "react-toastify";
const EditDevices = ({ deviceName, open, onClose, setEditRoomDrawer }) => {
  const [deviceNameState, setDeviceName] = useState("");
  const firebase = useFirebase();

  const editFormSubmitHandler = async (e) => {
    e.preventDefault();
    if(deviceNameState === "") return toast.error("Device Name is Required")
    const data = {
      deviceName: deviceNameState,
    };
    console.log(data);
    try {
      const result = await firebase.updateTheRealtimeDataBase(deviceName, data);
      console.log(result);
      toast.success("Device Updated Successfully");
      setDeviceName("");
      firebase.closeDeviceDrawer();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <Drawer open={open} onClose={onClose} anchor="right">
        <Box
          style={{
            width: "350px",
            padding: "20px",
            backgroundColor: "#f7d64a",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100" }}>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              Edit Device Name
            </Typography>
          </Box>
          <Box sx={{ width: "100%", marginTop: "10px" }}>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Enter Device Name"
              onChange={(e) => setDeviceName(e.target.value)}
              value={deviceNameState}
            ></TextField>
            <Button
              sx={{
                width: "100%",
                padding: "10px 18px",
                backgroundColor: "#000",
                marginTop: "10px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
              onClick={(e) => editFormSubmitHandler(e)}
            >
              Update Device
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default EditDevices;
