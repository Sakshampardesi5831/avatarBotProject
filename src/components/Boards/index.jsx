import { Fragment, useEffect, useState } from "react";
import "./board.css";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { EmailName } from "../../constants/commonFunction";
import BoardEntity from "./BoardEntity/BoardEntity";
const BoardsSection = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [boardDetails, setBoardDetailsData] = useState({});
  const user = firebase.currentLoggedInUser();
  const userName = EmailName(user.user.email);

  const boardDetailsData = async () => {
    const path = `${userName}/${userName}/${id}`;
    const boardDetails = await firebase.getDataFromDatabase(path);
    console.log(boardDetails);
    setBoardDetailsData(boardDetails);
  };
  useEffect(() => {
    boardDetailsData();
  }, []);

  return (
    <Fragment>
      <div className="boardContainer">
        {Object.keys(boardDetails).map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "250px",
              height: "250px",
              backgroundColor: "#222222",
              borderRadius: "20px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                padding: "10px",
                color: "#fff",
                fontSize: "20px",
              }}
            >
              {item}
            </Typography>
            <BoardEntity username={userName} id={id} item={item} />
          </Box>
        ))}
      </div>
    </Fragment>
  );
};

export default BoardsSection;
