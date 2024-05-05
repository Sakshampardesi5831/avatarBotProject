import { Fragment, useEffect, useState } from "react";
import { useFirebase } from "../../../../context/Firebase";
import "./boardDevice.css";
import { Box, Typography } from "@mui/material";
import CabinBoardsEntity from "../CabinBoardsEntity";
const CabinBoardsDevices = () => {
  const firebase = useFirebase();
  const [allCabinDeviceData, setAllCabinDeviceData] = useState({});
  const getAllCabinDeviceData = () => {
    const allCabinDeviceData = firebase.allCabinDeviceData;
    setAllCabinDeviceData(allCabinDeviceData);
    console.log(allCabinDeviceData);
  };



  useEffect(() => {
    getAllCabinDeviceData();
  }, []);
  return Object.keys(allCabinDeviceData).length == 0 ? (
    <Fragment>
      <div className="homepage2">
        <h1>No Device Found</h1>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="boardDeviceContainer">
        {Object.keys(allCabinDeviceData).map((item, index) => {
          const deviceData = allCabinDeviceData[item];
          console.log(deviceData);
          return (
            <Fragment key={index}>
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: "#222222",
                  borderRadius: "20px",
                  padding: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Box sx={{width:"100%",textAlign:"center",}}>
                  <Typography
                    sx={{
                      fontSize: "30px",
                      color: "#fff",
                      padding: "0px 10px",
                      fontWeight :"800"
                    }}
                  >
                    {deviceData.deviceName}
                  </Typography>
                </Box>
                <CabinBoardsEntity deviceData={deviceData} deviceName={item} />
              </Box>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default CabinBoardsDevices;
