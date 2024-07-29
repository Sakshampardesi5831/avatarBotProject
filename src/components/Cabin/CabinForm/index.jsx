import { Fragment } from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import AddCabinForm from "../../Home/AddCabinForm";
import DynamicDevice from "../../Home/DynamicDevice";
import ConfirmationPage from "../../Home/ConfirmationPage";
const CabinForm = () => {
  const dialogStyler = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "60%",
    height: "80%",
    borderRadius: "15px",
  };
  const firebase = useFirebase();
  const openCabinForm = firebase.cabinOpen;
  const currentStep = firebase.currentStep;
  const formtoFill = firebase.formsToGernerate;
  const boardForm = firebase.boardForm;
  const renderForm = () => {
    if (currentStep === 0 && boardForm === "addtoCabin") {
      return <AddCabinForm />;
    } else if (currentStep <= formtoFill && boardForm === "dynamicDevice") {
      return <DynamicDevice />;
    } else if (boardForm === "confirmation") {
      return <ConfirmationPage />;
    }
  };
  return (
    <Fragment>
      <Dialog open={openCabinForm} PaperProps={{ sx: dialogStyler }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%", padding: "10px" }}>
            <Typography
              sx={{
                fontSize: "30px",
                textAlign: "center",
                fontWeight: "700",
                color: "#000",
                marginTop: "5%",
              }}
            >
              WelCome To CabinForm Board Section
            </Typography>
          </Box>
          <Box sx={{ width: "100%", padding: "10px" }}>{renderForm()}</Box>
        </Box>
      </Dialog>
    </Fragment>
  );
};
export default CabinForm;
