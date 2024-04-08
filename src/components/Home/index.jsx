import { Fragment, useEffect, useState } from "react";
import "./home.css";
import { useFirebase } from "../../context/Firebase";

import { BoardsComponents } from "../";
import NoBoardComponents from "./NoBoardComponent";
import CreateBoard from "./CreateBoard";
import AddCabin from "./AddCabin";
const HomePage = () => {
  const firebase = useFirebase();
  const user= firebase.currentLoggedInUser();
  const open = firebase.open;
  const cabinDialog=firebase.cabinDialog;
  const handleAddCabinClose = firebase.handleDialogClose;
  const handleDialogOpen = firebase.handleDialogOpen;

  const [allData, setAllData] = useState([]);
  async function getDataFromPath(){
    const email=user.user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `/${username}/${username}`;
   const data= await firebase.getDataFromDatabase(path);
   console.log(data )
   setAllData(data);
  }
  useEffect(() => {
    getDataFromPath()
  }, []);

  return Object.keys(allData).length === 0 ? (
    <Fragment>
      <NoBoardComponents setCreateBoardDrawer={handleDialogOpen} />
      <CreateBoard drawerState={open} />
    </Fragment>
  ) : (
    <Fragment>
      <div className="homepageContainer">
        {Object.keys(allData).map((item, index) => {
          console.log(item);
          if(item==="cabinName"){
            const cabinName = allData[item];
            return <BoardsComponents key={index} tableData={cabinName} />;
          }
        })}
      </div>
      <AddCabin drawerState={cabinDialog} handleClose={handleAddCabinClose} />
    </Fragment>
  );
};

export default HomePage;
