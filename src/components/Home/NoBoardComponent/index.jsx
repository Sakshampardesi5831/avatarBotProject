/* eslint-disable react/prop-types */
import {} from 'react'
import { Box, Typography, Button } from "@mui/material";
import {Add} from '@mui/icons-material';
const NoBoardComponents = ({setCreateBoardDrawer}) => {
  return (
    <div className="homepage2">
    <Box
      sx={{
        width: "60%",
        height: "60vh",
        backgroundColor: "#0c1510",
        borderRadius: "20px",
        boxShadow: "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height:"100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "500", textAlign: "center",color:"#fff" }}
        >
          No Board is Register Currently Click to Create Cabin
        </Typography>
        <Button
          onClick={() => setCreateBoardDrawer(true)}
          className="button"
          sx={{
            width: "80%",
            padding: "15px 20px",
            backgroundColor: "#f9c20f",
            fontSize: "18px",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          <Add/>
          Create Cabin
        </Button>
      </Box>
    </Box>
  </div>
  )
}

export default NoBoardComponents