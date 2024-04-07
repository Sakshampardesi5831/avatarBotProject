import { Fragment, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";
const ConfirmationPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [boardsCreatedName, setBoardsCreatedName] = useState([]);
  const handleCloseDialog = firebase.handleDialogClose;
  const formData = firebase.formData;
  //const setBoardForm = firebase.setBoardForm;
  const MakeBoards = firebase.createTheTreeInDatabase;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await MakeBoards(formData);
    navigate("/dashboard");
    handleCloseDialog();
  };
  useEffect(() => {
    console.log(formData[formData.cabinName]);
    const myData = Object.keys(formData[formData.cabinName]).map(
      (item) => item
    );
    console.log(myData);
    setBoardsCreatedName(myData);
  }, []);

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
        <Typography fontSize={"20px"}>
          Boards Created for {formData.cabinName}
        </Typography>
        {boardsCreatedName.map((item, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              fontWeight: "700",
              color: "#000",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            {item}
          </Typography>
        ))}

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
            Submit
          </Button>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "700", color: "#000" }}>
          You can Register Only 5 devices to every cabin
        </Typography>
      </Box>
    </Fragment>
  );
};

export default ConfirmationPage;
