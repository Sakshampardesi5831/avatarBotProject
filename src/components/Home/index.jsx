import { Fragment, useEffect, useState } from "react";
import "./home.css";
import { useFirebase } from "../../context/Firebase";
import NoBoardComponents from "./NoBoardComponent";
import { AllRoomData } from "../";
import CreateRoomSections from "../Room";
import EditRoomForm from "../Room/EditRoomForm";
const HomePage = () => {
  const [editRoomDrawer, setEditRoomDrawer] = useState(false);
  const firebase = useFirebase();
  const roomFlag = firebase.roomFlag;
  const user = firebase.currentLoggedInUser();
  const roomOpen = firebase.room;
  const handleRoomOpen = firebase.handleRoomOpen;
  const [allData, setAllData] = useState([]);
  async function getDataFromPath() {
    const email = user.user.email;
    const username = email.substring(0, email.indexOf("@"));
    const path = `/${username}`;
    const data = await firebase.getDataFromDatabase(path);
    console.log(data);
    setAllData(data);
  }
  const toggleDrawer = () => {
    setEditRoomDrawer(!editRoomDrawer);
  };
  useEffect(() => {
    getDataFromPath();
  }, []);
  useEffect(() => {
    getDataFromPath();
  }, [roomFlag]);
  return Object.keys(allData).length === 0 ? (
    <Fragment>
      <NoBoardComponents setCreateBoardDrawer={handleRoomOpen} />
      <CreateRoomSections drawerState={roomOpen} />
    </Fragment>
  ) : (
    <Fragment>
      <div className="homepageContainer">
        {Object.keys(allData).map((item, index) => {
          return (
            <Fragment key={index}>
              <AllRoomData
                tableData={allData[item].rooms.room}
                roomId={item}
                setEditRoomDrawer={setEditRoomDrawer}
              />
              <CreateRoomSections drawerState={roomOpen} />
              <EditRoomForm
                roomId={item}
                open={editRoomDrawer}
                onClose={toggleDrawer}
                setEditRoomDrawer={setEditRoomDrawer}
              />
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default HomePage;
// const open = firebase.open;
// console.log(allData[item].room);
//{/* <AddCabin drawerState={cabinDialog} handleClose={handleAddCabinClose} /> */}
// const cabinDialog = firebase.cabinDialog;
// const handleAddCabinClose = firebase.handleDialogClose;
//const handleDialogOpen = firebase.handleDialogOpen;
