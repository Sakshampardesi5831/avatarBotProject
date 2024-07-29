/* eslint-disable react/prop-types */
import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import{ Fragment } from 'react'

const NoCabinComponent = ({handleCabinOpenHandler}) => {
  return (
    <Fragment>
    <Box
      sx={{
        width: "55%",
        height: "70vh",
        backgroundColor: "#222222",
        borderRadius: "20px",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "white", textAlign: "center" }}
      >
        Welcome to Cabin Section
      </Typography>
      <Typography
        
        sx={{ color: "white", textAlign: "center", marginTop: "5%",fontSize:"35px" }}
      >
        No Cabin Is Created
      </Typography>
      <Button
        onClick={(e)=>handleCabinOpenHandler(e)}
        className="button"
        sx={{
          backgroundColor: "#f9c20f",
          width: "60%",
          fontSize: "20px",
          padding: "15px",
          color: "#fff",
          borderRadius: "15px",
          marginTop: "20px",
        }}
      >
        <Add /> Create Cabin
      </Button>
    </Box>
  </Fragment>
  )
}

export default NoCabinComponent