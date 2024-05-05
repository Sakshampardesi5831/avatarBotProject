/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";
import { Delete, Edit } from "@mui/icons-material";
const CabinBoards = ({ data, cabinName, cabinId, roomId }) => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  //console.log("cabinName", cabinName);
  if (!data || !cabinName || !cabinId || !roomId) {
    return null;
  }
  const devicePageHandler = () => {
    firebase.setAllCabinDeviceData(data);
    firebase.setRoomId(roomId);
    firebase.setCabinId(cabinId);
    firebase.setCurrentCabinName(cabinName);
    navigate("/device");
  };
  return (
    <Fragment>
      <Box
        sx={{
          width: "250px",
          height: "250px",
          backgroundColor: "#222222",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#fff",
            padding: "0px 20px",
          }}
        >
          {cabinName}
        </Typography>
        <Button
          onClick={() => devicePageHandler()}
          sx={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#f9c20f",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#f9c20f",
            },
          }}
        >
          Details
        </Button>
        <Box
          sx={{
            width: "100%",
            padding: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#fff",
              "&:hover": { backgroundColor: "#fff" },
            }}
            onClick={() => firebase.setOpenEditCabin(true)}
          >
            <Edit sx={{ color: "green" }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#fff",
              "&:hover": { backgroundColor: "#fff" },
            }}
            onClick={() => firebase.setOpenDelete(true)}
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </Box>
      </Box>
    </Fragment>
  );
};

export default CabinBoards;
// {data[device].isFan && (
//     <Typography
//       sx={{
//         fontSize: "20px",
//         color: "#fff",
//         padding: "10px 20px",
//       }}
//     >
//       Fan State: {data[device].fanState}
//     </Typography>
//   )}
{
  /* <Typography
            sx={{
              fontSize: "20px",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Power State: {data[device].powerState}
          </Typography> */
}
