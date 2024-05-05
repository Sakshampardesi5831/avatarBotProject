/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState, Fragment } from "react";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import { toast } from "react-toastify";
const EditCabin = ({ open, onClose,  roomId }) => {
  const [cabinName, setCabinName] = useState("");
  const firebase = useFirebase();
  // console.log("cabinId",cabinId);
  const cabinId=firebase.cabinId;
  console.log("cabinId", cabinId);
  const setOpenEditCabin = firebase.setOpenEditCabin;
  const updateCabinName = firebase.updateCabinName;
  const editFormSubmitHandler = async (e) => {
    e.preventDefault();
    await updateCabinName(roomId, cabinId, cabinName);
    toast.success("Cabin Updated Successfully");
    setOpenEditCabin(false);
    setCabinName("");
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
              Edit Cabin Form
            </Typography>
          </Box>
          <Box sx={{ width: "100%", marginTop: "10px" }}>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Enter Cabin Name"
              onChange={(e) => setCabinName(e.target.value)}
              value={cabinName}
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
              Update CabinName
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default EditCabin;
