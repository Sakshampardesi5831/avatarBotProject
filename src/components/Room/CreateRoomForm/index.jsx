import { Fragment, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
const CreateRoomForm = () => {
  const firebase = useFirebase();
  const [room, setRoom] = useState("");
  const [error, setError] = useState(false);
  const handleRoomCloseDialog = firebase.handleRoomClose;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (room === "") {
      setError(true);
      return;
    }
    await firebase.saveRoomForm(room);
    setRoom("");
    handleRoomCloseDialog();
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
          Enter Room Name
        </Typography>
        <TextField
          sx={{ width: "100%", marginTop: "20px" }}
          placeholder="Enter the Room Name"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
        {error && <span style={{ color: "red" }}>room name is required !</span>}
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
            onClick={handleRoomCloseDialog}
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
            Save Room
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default CreateRoomForm;
