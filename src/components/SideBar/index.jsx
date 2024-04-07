/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { Box, Button,Typography } from "@mui/material";
import { useFirebase } from "../../context/Firebase";
const SideBar = ({ open, onClose, headerLinks, logoutButton }) => {
  const firebase = useFirebase();
  const activeUser = firebase.currentLoggedInUser();
  return (
    <Fragment>
      <Drawer open={open} onClose={onClose} anchor="right"      >
        <Box style={{ width: 250,padding:"20px",backgroundColor:"#f7d64a",height:"100%" }} onClick={onClose}>
        <Typography sx={{padding:"10px",fontSize:"15px",fontWeight:"700"}}>
              {activeUser?.authStatus ? activeUser?.user.email : null}
            </Typography>
          <List>
            {headerLinks.map((link) =>
              link.auth ? (
                <ListItem key={link.name}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontWeight: "700",
                    }}
                    to={`${link.path}`}
                  >
                    {link.name}
                  </Link>
                </ListItem>
              ) : (
                ""
              )
            )}
          </List>
         
          {logoutButton && (
            <Button
              onClick={() => firebase.signOutUser()}
              sx={{
                fontSize: "15px",
                backgroundColor: "#000",
                padding: "8px 20px",
                color: "#fff",
                fontWeight: "700",
                width: "100%",
                
                "&:hover": {
                  backgroundColor: "#f9c20f",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default SideBar;
