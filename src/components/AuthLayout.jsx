/* eslint-disable react/prop-types */
import{ useEffect,useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
const AuthLayout = ({children,authentication=true}) => {
  const firebase=useFirebase();
  const activeUser = firebase.currentLoggedInUser();
  const navigate=useNavigate();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if (authentication && activeUser.authStatus !== authentication) {
        navigate("/login");
        // toast.warn("Login to Access the Resource")
      } else if (!authentication && activeUser.authStatus !== authentication) {
        navigate("/dashboard");
        toast.success("Welcome back!");
      }
    setLoading(false);
  },[activeUser.authStatus,navigate,authentication])
 return loading ? <h1>Loading...</h1> : children;
}

export default AuthLayout