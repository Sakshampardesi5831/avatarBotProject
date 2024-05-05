import { Fragment, useState } from "react";
import {
  Box,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  EmailOutlined,
  LockOpen,
  Google,
  FacebookOutlined,
  // PersonOutlined,
} from "@mui/icons-material";
import "./index.css";
import { useFirebase } from "../../context/Firebase";
import { toast } from "react-toastify";
import {} from "react-router-dom";
const Register = () => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseInstance = useFirebase();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const newUser = await firebaseInstance.signUpUserUsingEmailAndPassword(
        email,
        password
      );
      setEmail("");
      setPassword("");
      toast.success("User created successfully");
      console.log("new user", newUser);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="mainDiv">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" },
              minHeight: "80vh",
              boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.3)",
              backgroundColor: "#fff",
              borderRadius:"20px"
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: {
                  xs: "90vh",
                  sm: "90vh",
                  md: "80vh",
                  lg: "80vh",
                  xl: "80vh",
                },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  height: { xs: "35%", sm: "40%", md: "100%" },
                  display: "flex",
                  alignItems: {
                    xs: "flex-start",
                    sm: "flex-start",
                    md: "center",
                    lg: "center",
                    xl: "center",
                  },
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    maxWidth:
                      isExtraSmallScreen || isSmallScreen || isMediumScreen
                        ? "60%"
                        : "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src="https://res.cloudinary.com/mybackendcloud/image/upload/v1711009683/z8jxzzpvlgff3eda0ov6.jpg"
                  alt="photo"
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  height: { xs: "50%", md: "100%" },
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter the Email"
                  variant="outlined"
                  type="email"
                  margin="normal"
                  sx={{
                    marginBottom: {
                      xs: "18px",
                      sm: "18px",
                      md: "20px",
                      lg: "25px",
                      xl: "25px",
                    },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  placeholder="Enter the Password"
                  margin="normal"
                  sx={{
                    marginBottom: {
                      xs: "18px",
                      sm: "18px",
                      md: "20px",
                      lg: "25px",
                      xl: "25px",
                    },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#f8e111",
                    marginTop: "10px",
                  }}
                  onClick={(e) => handleSubmit(e)}
                  variant="contained"
                  className="button"
                >
                  Create Account
                </Button>
                <Box
                  sx={{
                    width: "100%",
                    padding: {
                      xs: "0px",
                      sm: "0px",
                      md: "10px",
                      lg: "10px",
                      xl: "10px",
                    },
                    marginTop: {
                      xs: "5px",
                      sm: "5px",
                      md: "5px",
                      lg: "20px",
                      xl: "20px",
                    },
                  }}
                >
                  <Typography
                    sx={{ color: "#afaea9", textAlign: "center" }}
                    variant="body1"
                  >
                    or sign up using these accounts
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: {
                        xs: "10px",
                        sm: "20px",
                        md: "20px",
                        lg: "20px",
                        xl: "20px",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Google
                        onClick={() => firebaseInstance.signUpWithGoogle()}
                        sx={{
                          fontSize: {
                            xs: "40px",
                            sm: "40px",
                            md: "40px",
                            lg: "40px",
                            xl: "50px",
                          },
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          padding: "5px",
                        }}
                      />
                      <FacebookOutlined
                        sx={{
                          fontSize: {
                            xs: "40px",
                            sm: "40px",
                            md: "40px",
                            lg: "40px",
                            xl: "50px",
                          },
                          color: "white",
                          backgroundColor: "blue",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>

                    {/* <Typography
                      sx={{
                        color: "#000",
                        textAlign: "center",
                        fontWeight:"700",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <Link to="/login" style={{textDecoration:"none",color:"#000"}}>
                         Log In
                      </Link>
                    </Typography> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </Fragment>
  );
};

export default Register;
