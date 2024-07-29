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
  const handleCabinClose = firebase.handleCabinClose;
  const currentStep = firebase.currentStep;
  const setCurrentStep = firebase.setCurrentStep;
  const setBoardForm = firebase.setBoardForm;
  
  const handleSubmit =(e) => {
    e.preventDefault();
    console.log("hello");
    if(cabinName1===""){
      setError(true);
      return;
    }
    let myvalue={
      boardName:cabinName1,
    }
    firebase.setAddCabinFormData({...myvalue,...addCabinFormData})
    firebase.setFormsToGenerate(formsToGenerate);
    setCurrentStep(currentStep + 1);
    setBoardForm("dynamicDevice");
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
            onClick={()=>handleCabinClose()}
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
