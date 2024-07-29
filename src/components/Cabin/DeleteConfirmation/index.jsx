/* eslint-disable react/prop-types */
import { Fragment, useEffect } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useFirebase } from "../../../context/Firebase";
import { toast } from "react-toastify";
const DeleteConfirmationPage = ({ registerDevices, cabinId, roomId }) => {
  const firebase = useFirebase();
  console.log("registerDevices", registerDevices);
  const openDelete = firebase.openDelete;
  const dialogStyler = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "30%",
    height: "70%",
    borderRadius: "15px",
    padding: "10px",
  };
  const handleDevices = () => {
    const allRegisteredDevices = Object.keys(registerDevices).map(
      (key) => registerDevices[key]
    );

    const deviceNames = Object.keys(allRegisteredDevices[1]).map((key) => {
      const device = allRegisteredDevices[1][key];
      return (
        <Fragment key={key}>
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            {device.deviceName}
          </Typography>
        </Fragment>
      );
    });

    return deviceNames;
  };

  const handleDeleteHandler = async () => {
    await firebase.deleteCabinName(roomId, cabinId);
    toast.success("Cabin Deleted Successfully");
  };

  useEffect(() => {
    handleDevices();
  }, []);
  

  return (
    <Fragment>
      <Dialog open={openDelete} PaperProps={{ sx: dialogStyler }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
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
              Confirmation Page
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              padding: "10px",
              // border: "2px solid red",
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {handleDevices()}
          </Box>
          <Box
            sx={{
              width: "100%",

              padding: "15px",
              display: "flex",
              gap: "15px",
              justifyContent: "space-around",
            }}
          >
            <Button
              sx={{
                padding: "10px 8px",
                backgroundColor: "red",
                color: "#fff",
                "&:hover": { backgroundColor: "red" },
              }}
              //onClick={() => firebase.deleteCabinName()}
              onClick={() => handleDeleteHandler()}
            >
              Yes
            </Button>
            <Button
              onClick={() => firebase.setOpenDelete(false)}
              sx={{
                padding: "10px 8px",
                backgroundColor: "green",
                color: "#fff",
                "&:hover": { backgroundColor: "green" },
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Fragment>
  );
};

export default DeleteConfirmationPage;
