import { Fragment, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import Switch from "@mui/material/Switch";
const Device3 = () => {
  const firebase = useFirebase();
  const [checked, setChecked] = useState(false);
  const setBoardForm = firebase.setBoardForm;
  const handleCloseDialog = firebase.handleDialogClose;
  const formData = firebase.formData;
  const [device3, setDevice3] = useState("");
  const [error, setError] = useState(false);
  const [isFanDevice, setIsFanDevice] = useState("No");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (device3.length === 0) {
      setError(true);
      return;
    }

    let newData = {};

    if (checked) {
      newData = {
        [device3]: {
          isFan: true,
          fanState: "Low",
          powerState: "Off",
        },
      };
    } else {
      newData = {
        [device3]: {
          [device3]: 0,
          isFan: false,
          [`${device3}State`]: 0,
        },
      };
    }

    firebase.setFormData({
      ...formData,
      [formData.cabinName]: { ...formData[formData.cabinName], ...newData },
    });
    setDevice3("");
    setBoardForm("device4");
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) setIsFanDevice("Yes");
    else setIsFanDevice("No");
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
          Enter Third Device Name
        </Typography>
        <TextField
          sx={{ width: "100%", marginTop: "20px" }}
          placeholder="Enter the Third Device Name"
          onChange={(e) => setDevice3(e.target.value)}
          value={device3}
        />
        {error && (
          <span style={{ color: "red" }}>device name is required !</span>
        )}
        <Box
          sx={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Is This is Fan Device</Typography>
          <Switch
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: "#f9c20f",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "#000000 !important",
              },
            }}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography
            variant="body1"
            color={isFanDevice == "No" ? "red" : "green"}
          >
            {isFanDevice}
          </Typography>
        </Box>

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
            sx={{ padding: "10px 20px", backgroundColor: "red", color: "#fff" }}
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

export default Device3;
