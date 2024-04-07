import { Fragment, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";

const BoardNameForm = () => {
  const firebase = useFirebase();
  const setBoardForm=firebase.setBoardForm;
  const handleCloseDialog = firebase.handleDialogClose;
  const formData=firebase.formData;
  const [cabinName, setCabinName] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    if (cabinName.length == 0) {
      setError(true);
      return;
    }
    let newData={}
    e.preventDefault();
     newData={
      cabinName:cabinName,
    }
    firebase.setFormData({...formData,...newData});
    setCabinName("");
    setBoardForm("device1");
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
          onChange={(e) => setCabinName(e.target.value)}
          value={cabinName}
        />
        {error && (
          <span style={{ color: "red" }}>cabin name is required !</span>
        )}
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
            onClick={handleCloseDialog}
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
        <Typography variant="body1" sx={{ fontWeight: "700", color: "#000" }}>
          You can Register Only 5 devices to every cabin
        </Typography>
      </Box>
    </Fragment>
  );
};

export default BoardNameForm;
