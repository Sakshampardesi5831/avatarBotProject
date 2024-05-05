import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./roomsection.css";
import { EmailName } from "../../../constants/commonFunction";
import { useFirebase } from "../../../context/Firebase";
import NoCabinComponent from "../../Cabin/NoCabinComponent";
import CabinForm from "../../Cabin/CabinForm";
import CabinBoards from "../../Cabin/CabinCards";
import EditCabin from "../../Cabin/EditCabin";
import DeleteConfirmationPage from "../../Cabin/DeleteConfirmation";
const RoomSection = () => {
  const { id } = useParams();
  const [allDataofCabin, setAllDataOfCabin] = useState([]);
  const firebase = useFirebase();
  const user = firebase.currentLoggedInUser();
  const setBoardForm = firebase.setBoardForm;
  const getAllDataOfCabin = async () => {
    const userName = EmailName(user.user.email);
    const path = `${userName}/${id}/rooms/`;
    const getAllCabin = await firebase.getDataFromDatabase(path);
    console.log(getAllCabin, "mydata");
    setAllDataOfCabin(getAllCabin);
  };
  const handleCabinOpen = firebase.handleCabinOpen;
  const openEditCabin = firebase.openEditCabin;
  const cabinFlag = firebase.cabinFlag;
  const setOpenEditCabin = firebase.setOpenEditCabin;
  const handleCabinOpenHandler = (e) => {
    e.preventDefault();
    handleCabinOpen();
    setBoardForm("addtoCabin");
  };
  const toggleDrawer = () => {
    setOpenEditCabin(!setOpenEditCabin);
  };
  useEffect(() => {
    getAllDataOfCabin();
  }, []);
  useEffect(() => {
    getAllDataOfCabin();
  }, [cabinFlag]);
  return (
    <Fragment>
      <div>
        {Object.keys(allDataofCabin).length == 1 ? (
          <Fragment>
            <div className="homepage2">
              <NoCabinComponent
                handleCabinOpenHandler={handleCabinOpenHandler}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="roomsectionContainer">
              {Object.keys(allDataofCabin)
                .filter((key) => key !== "room")
                .map((item) => {
                  console.log("allCabinData", allDataofCabin);
                  const room = allDataofCabin[item];
                  console.log(item);
                  console.log(room);
                  return (
                    <Fragment key={room.boardName}>
                      <CabinBoards
                        data={room.boards}
                        cabinName={room?.boardName}
                        cabinId={item}
                        roomId={id}

                      />
                      <EditCabin
                        roomId={id}
                        open={openEditCabin}
                        onClose={toggleDrawer}
                      />
                      <DeleteConfirmationPage
                        registerDevices={room}
                        cabinId={item}
                        roomId={id}
                      />
                    </Fragment>
                  );
                })}
            </div>
          </Fragment>
        )}
        <CabinForm />
      </div>
    </Fragment>
  );
};

export default RoomSection;
