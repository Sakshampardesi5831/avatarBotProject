import { useState } from "react";
import { Fragment } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
const AddCabinForm = () => {
  const firebase = useFirebase();
  const [cabinName1, setCabinName1] = useState("");
  const addCabinFormData = firebase.addCabinFormData;
  const [error, setError] = useState(false);
  const [formsToGenerate, setFormsGenerate] = useState(0);
  const oncloseHandler = firebase.handleAddCabinClose;
  const currentStep = firebase.currentStep;
  
  // const cabinFormsToGenerate = firebase.setFormsToGenerate;
  const handleSubmit =(e) => {
    e.preventDefault();
    if (cabinName1 === "") {
      setError(true);
      return;
    }
    let myvalue={
      cabinName:cabinName1,
    }
    firebase.setAddCabinFormData({...myvalue,...addCabinFormData});
    firebase.setFormsToGenerate(formsToGenerate);
    firebase.setCurrentStep(currentStep + 1);
    setCabinName1("");
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
          Cabin Name
        </Typography>
        <TextField
          sx={{ width: "100%", marginTop: "20px" }}
          placeholder="Enter the Cabin Name"
          onChange={(e) => setCabinName1(e.target.value)}
          value={cabinName1}
        />
        {error && (
          <span style={{ color: "red" }}>cabin name is required !</span>
        )}
        <TextField
          sx={{ width: "100%", marginTop: "20px" }}
          placeholder="Enter the Devices Quantity"
          onChange={(e) => setFormsGenerate(e.target.value)}
          value={formsToGenerate}
        />
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
                backgroundColor: "red",
              },
            }}
            onClick={oncloseHandler}
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
            Next
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default AddCabinForm;
