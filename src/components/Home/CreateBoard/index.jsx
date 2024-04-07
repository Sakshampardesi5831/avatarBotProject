/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useFirebase } from "../../../context/Firebase";
import BoardNameForm from "../BoardNameForm";
import Device1 from "../Device1";
import Device2 from "../Device2";
import Device3 from "../Device3";
import Device4 from "../Device4";
import Device5 from "../Device5";
import ConfirmationPage from "../ConfirmationPage";
const CreateBoard = ({ drawerState, handleClose }) => {
  const firebase = useFirebase();
  const boardForm = firebase.boardForm;
  
  const dialogStyler = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "60%",
    height: "80%",
    borderRadius: "15px",
    padding: "20px 15px",
  };
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
              WelCome To Register Board Section
            </Typography>
          </Box>
          {boardForm == "cabinform" ? <BoardNameForm /> : ""}
          {boardForm == "device1" ? <Device1 /> : ""}
          {boardForm == "device2" ? <Device2 /> : ""}
          {boardForm == "device3" ? <Device3 /> : ""}
          {boardForm == "device4" ? <Device4 /> : ""}
          {boardForm == "device5" ? <Device5 /> : ""}
          {boardForm == "confirmation" ? <ConfirmationPage /> : ""}
        </Box>
      </Dialog>
    </Fragment>
  );
};

export default CreateBoard;
