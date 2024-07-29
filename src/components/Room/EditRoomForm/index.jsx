/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, Fragment } from "react";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import { toast } from "react-toastify";
const EditRoomForm = ({ roomId, open, onClose, setEditRoomDrawer }) => {
  const [roomName, setRoomName] = useState("");
  const firebase = useFirebase();
  
  const editFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await firebase.updateRoom(roomId, roomName);
      toast.success("Room Updated Successfully");
      setEditRoomDrawer(false);
      setRoomName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <Drawer open={open} onClose={onClose} anchor="right">
        <Box
          style={{
            width: 350,
            padding: "20px",
            backgroundColor: "#f7d64a",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100" }}>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              Edit Room Form
            </Typography>
          </Box>
          <Box sx={{ width: "100%", marginTop: "10px" }}>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Enter Room Name"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
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
              Update Room
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default EditRoomForm;
