/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { useFirebase } from "../../../context/Firebase";
import { Box, Typography, Switch } from "@mui/material";
import { TipsAndUpdates, Lightbulb } from "@mui/icons-material";
const BoardEntity = ({ username, id, item }) => {
  const firebase = useFirebase();
  const [boardValues, setBoardValues] = useState({});
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState("Off");
  
  const bulb = () => {
    return switchOn === "On" ? (
      <TipsAndUpdates sx={{ fontSize: "30px", color: "#f9c20f" }} />
    ) : (
      <Lightbulb sx={{ fontSize: "30px", color: "#fff" }} />
    );
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setSwitchOn("On");
      updateBoardValues("On");
    } else {
      setSwitchOn("Off");
      updateBoardValues("Off");
    }
  };

  const boardEntity = async () => {
    const path = `${username}/${username}/${id}/${item}`;
    const boardValues = await firebase.getDataFromDatabase(path);
    console.log(boardValues);
    setBoardValues(boardValues);
  };

  const updateBoardValues = async (condition) => {
    const path = `${username}/${username}/${id}/${item}`;
    console.log(path);
    if (condition == "On") {
      const values = {
        [item]: 1,
        [`${item}State`]:0
      };
      const updatedValues = await firebase.setTheValuesInTreeOfDataBase(
        path,
        values
      );
    } else if (condition == "Off") {
        const values = {
            [item]: 0,
            [`${item}State`]:0
          };
      console.log(values);
      const updatedValues = await firebase.setTheValuesInTreeOfDataBase(
        path,
        values
      );
    } else {
      console.log("Bad Request");
    }
  };


  useEffect(() => {
    boardEntity();
  }, []);

  useEffect(() => {
    boardEntity();
  }, [checked]);

  return boardValues.isFan ? (
    <Fragment>
      <Box>
        <Typography sx={{ color: "#fff" }}>Fan</Typography>
      </Box>
    </Fragment>
  ) : (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "red", fontSize: "20px" }}>Off</Typography>
        <Switch
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: "#f9c20f",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#fff !important",
            },
          }}
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography sx={{ color: "yellow", fontSize: "20px" }}>On</Typography>
      </Box>
      <Box sx={{ width: "100%", padding: "5px", textAlign: "center" }}>
        {bulb()}
      </Box>
      <Box sx={{ width: "100%", padding: "10px" }}>
        {Object.keys(boardValues).map((item, index) => {
          if (item !== "isFan") {
            return (
              <Typography sx={{ color: "#fff" }} key={index}>
                {item}: {boardValues[item]}
              </Typography>
            );
          }
          return null;
        })}
      </Box>
    </Fragment>
  );
};

export default BoardEntity;
// {boardValues[item]}