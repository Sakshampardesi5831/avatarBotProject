/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Box, Typography } from "@mui/material";
import AddCabinForm from "../AddCabinForm";
import DynamicDevice from "../DynamicDevice";
import { useFirebase } from "../../../context/Firebase";
const AddCabin = ({ drawerState, handleClose }) => {
  const firebase = useFirebase();
  const dialogStyler = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "60%",
    height: "80%",
    borderRadius: "15px",
    padding: "20px 15px",
  };
  const currentStep = firebase.currentStep;
  return (
    <Fragment>
      <Dialog
        open={drawerState}
        onClose={handleClose}
        PaperProps={{ sx: dialogStyler }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "10px",
          }}
        >
          <Box sx={{ width: "100%", padding: "10px" }}>
            <Typography
              sx={{ fontSize: "30px", textAlign: "center", fontWeight: "700" }}
            >
              Hello,There Add Cabin Here !
            </Typography>
          </Box>
          {currentStep === 0 ? <AddCabinForm /> : <DynamicDevice />}
        </Box>
      </Dialog>
    </Fragment>
  );
};

export default AddCabin;
