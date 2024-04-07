/* eslint-disable react/prop-types */
import { Fragment, } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const BoardsComponents = ({ tableData }) => {
  const navigate = useNavigate();
  const cabinDetails = (tableData) => {
    navigate(`/board/${tableData}`);
  };
  return (
    <Fragment>
      <Box
        sx={{
          width: "250px",
          height: "250px",
          backgroundColor: "#000",
          borderRadius: "20px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography sx={{ fontSize: "25px", fontWeight: "500", color: "#fff" }}>
          {tableData}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            padding: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              padding: "10px 20px",
              backgroundColor: "#fffb7d",
              width: "100%",
              color: "#000",
              fontWeight: "700",
              '&:hover':{
                backgroundColor: "#f9c20f"
              }
            }}
            onClick={() => cabinDetails(tableData)}
          >
            Details
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default BoardsComponents;
// const fanSpeedHandler = () => {
//   if (fanSpeed === "Low") {
//     return (
//       <Typography sx={{ fontSize: "20px", color: "#000" }}>Low</Typography>
//     );
//   } else if (fanSpeed === "Medium") {
//     return (
//       <Typography sx={{ fontSize: "20px", color: "#000" }}>Medium</Typography>
//     );
//   } else if (fanSpeed === "High") {
//     return (
//       <Typography sx={{ fontSize: "20px", color: "#000" }}>High</Typography>
//     );
//   }
// };
// const fanSpeedButton = (fanSpeedState) => {
//   if (fanSpeedState === "Low") {
//     setFanSpeed("Medium");
//   } else if (fanSpeedState === "Medium") {
//     setFanSpeed("High");
//   } else if (fanSpeedState === "High") {
//     setFanSpeed("Low");
//   }
// };
// const boardDetails = async () => {
//   const boardDataTable = await firebase.getDataFromDatabase(`/${tableData}`);
//   console.log(boardDataTable);
//   setTableDetails(boardDataTable);
// };
// useEffect(() => {
//   boardDetails();
// }, []);
{
  /* <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: swtchOn == "Off" ? "red" : "#000",
            }}
          >
            Off
          </Typography> */
}
{
  /* <Switch
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
          /> */
}
{
  /* <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: swtchOn == "On" ? "#f9c20f" : "#000",
            }}
          >
            On
          </Typography> */
}
{
  /* <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
            Device State :-
          </Typography>
          {tableData === "FanDevice1" ? (
            <Typography sx={{ fontSize: "20px", color: "#000" }}>
              Fan 1
            </Typography>
          ) : tableData === "FanDevice2" ? (
            <Typography sx={{ fontSize: "20px", color: "#000" }}>
              Fan 2
            </Typography>
          ) : tableData === "FanDevice3" ? (
            <Typography sx={{ fontSize: "20px", color: "#000" }}>
              Fan 3
            </Typography>
          ) : (
            <>{bulb()}</>
          )} */
}
// const bulb = () => {
//   return swtchOn === "On" ? (
//     <TipsAndUpdates sx={{ fontSize: "20px", color: "#f9c20f" }} />
//   ) : (
//     <Lightbulb sx={{ fontSize: "20px", color: "#000" }} />
//   );
// };
// const [tableDetails, setTableDetails] = useState(null);
// const [fanSpeed, setFanSpeed] = useState("Low");
// const [checked, setChecked] = useState(true);
// const [swtchOn, setSwitchOff] = useState("Off");
// const handleChange = (event) => {
//   setChecked(event.target.checked);
//   if (event.target.checked) {
//     setSwitchOff("On");
//   } else {
//     setSwitchOff("Off");
//   }
// };
