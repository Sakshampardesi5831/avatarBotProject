import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Add, Bolt } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { SideBar } from "../../components";
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const firebase = useFirebase();
  const activeUser = firebase.currentLoggedInUser();
  const handleRoomOpen = firebase.handleRoomOpen;
  const isMediumScreen = useMediaQuery("(max-width: 860px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isExtraSmallScreen = useMediaQuery("(max-width: 480px)");
  console.log(activeUser);
  let headerLinks = [
    {
      path: "/login",
      name: "Login",
      auth: !activeUser?.authStatus,
    },
    {
      path: "/register",
      name: "Register",
      auth: !activeUser?.authStatus,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      auth: activeUser?.authStatus,
    },
  ];

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#000", width: "100%" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            >
              <Bolt sx={{ color: "#f9c20f" }} fontSize="50px" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AVATARBOT
            </Typography>
            <Typography>
              {activeUser?.authStatus ? activeUser?.user.email : null}
            </Typography>
            <List
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                marginRight: "10px",
              }}
            >
              {headerLinks.map((link) =>
                link.auth ? (
                  <ListItem sx={{ fontSize: "20px" }} key={link.name}>
                    <Link
                      style={{ textDecoration: "none", color: "#fff" }}
                      key={link.name}
                      to={link.path}
                    >
                      {link.name}
                    </Link>
                  </ListItem>
                ) : (
                  ""
                )

              )}

            </List>
            {activeUser?.authStatus && (
              <Button
                onClick={handleRoomOpen}
                sx={{
                  fontSize: "15px",
                  backgroundColor: "#f9c20f",
                  padding: "8px 20px",
                  color: "#000",
                  fontWeight: "700",
                  "&:hover": {
                    backgroundColor: "#f9c20f",
                  },
                  marginRight:"10px",
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
               <Add/> Add Room
              </Button>
            )}
            {activeUser?.authStatus && (
              <Button
                onClick={() => firebase.signOutUser()}
                sx={{
                  fontSize: "15px",
                  backgroundColor: "#fff",
                  padding: "8px 20px",
                  color: "#000",
                  fontWeight: "700",
                  "&:hover": {
                    backgroundColor: "#f9c20f",
                  },
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
                Logout
              </Button>
            )}
            
            {(isMediumScreen || isSmallScreen || isExtraSmallScreen) && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={toggleDrawer} // Open/close the drawer
              >
                <Menu sx={{ color: "#fff" }} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <SideBar open={drawerOpen} onClose={toggleDrawer} headerLinks={headerLinks} logoutButton={activeUser?.authStatus} />
      </Box>
    </Fragment>
  );
};

export default Header;
