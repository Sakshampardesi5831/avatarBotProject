import { Fragment } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ConfirmationPage = () => {
  const firebase = useFirebase();
  const handleCabinClose = firebase.handleCabinClose;
  const addCabinFormData = firebase.addCabinFormData;
  const saveCabinForm = firebase.saveCabinForm;
  const cabinData = addCabinFormData.boards;
  const roomId = useParams().id;
  console.log(addCabinFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      saveCabinForm(addCabinFormData, roomId);
      toast.success("Board and Devices created successfully");
      handleCabinClose();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "800" }}>
          These are Boards which are created
        </Typography>
        {Object.keys(cabinData).map((item) => {
          return (
            <Typography
              sx={{ fontSize: "20px", fontWeight: "500", marginTop: "20px" }}
              key={item}
            >
              {cabinData[item].deviceName}
            </Typography>
          );
        })}
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
            sx={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "#fff",
              "&:hover": {
                backgroundColor: "red ",
              },
            }}
            onClick={handleCabinClose}
          >
            close
          </Button>
          <Button
            className="button"
            sx={{
              padding: "10px 20px",
              backgroundColor: "#f9c20f",
              color: "#fff",
            }}
            onClick={(e) => handleSubmit(e)}
          >
            <Add /> Create Board and Devices
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ConfirmationPage;
