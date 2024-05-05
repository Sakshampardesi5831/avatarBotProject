/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CreateRoomForm from "./CreateRoomForm";
const CreateRoomSections = ({drawerState}) => {
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
          WelCome to Room Section
        </Typography>
        <CreateRoomForm />
      </Box>
    </Box>
  </Dialog>
</Fragment>
  );
};

export default CreateRoomSections;
