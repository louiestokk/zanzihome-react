import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { setFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    border: "1px solid black",
    padding: "0.5rem"
  },
  root: {
    textAlign: "center",
    width: "100%",
    height: "100%"
  },
  remove: {
    background: "red",
    color: "white",
    cursor: "pointer"
  },
  update: {
    background: "green",
    color: "white",
    cursor: "pointer"
  },
  modal: {
    display: "flex"
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  statsItem: {
    width: "300px",
    height: "200px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "1.5rem 0",
    borderRadius: "10px",
    cursor: "pointer"
  },
  vehicleItem: {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column"
  }
});

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [firestoreData, setData] = useState();
  const [updated, setupDated] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [rent, setrent] = useState(false);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState("");
  const [showAllProperties, setshowAllProperties] = useState(false);
  const fetchFirestoreData = async () => {
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(newData);
    });
  };

  const handleSetPaid = async (adId) => {
    try {
      const q = query(
        collection(db, "newAd"),
        where("adId", "==", Number(adId))
      );
      const querySnapshot = await getDocs(q);
      let docId = "";
      querySnapshot.forEach((doc) => (docId = doc.id));
      const object = doc(db, "newAd", docId);
      await updateDoc(object, {
        paid: true
      });
      console.log("updated");
      setupDated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const newItems = firestoreData.filter((el) => el.Email === e.target.value);
    if (newItems && newItems.length > 0) {
      setData(newItems);
    }
  };

  const handleRemoveObject = async (adId) => {
    const newArray = firestoreData.filter((el) => el.adId != adId);
    dispatch(setFirestoreData(newArray));
    setData(newArray);
    try {
      const q = query(
        collection(db, "newAd"),
        where("adId", "==", Number(adId))
      );
      const querySnapshot = await getDocs(q);
      let docId = "";
      querySnapshot.forEach((doc) => (docId = doc.id));
      const object = doc(db, "newAd", docId);
      await updateDoc(object, {
        removed: true
      });
      console.log("updated");
      setupDated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateObject = async (adId) => {
    try {
      const q = query(
        collection(db, "newAd"),
        where("adId", "==", Number(adId))
      );
      const querySnapshot = await getDocs(q);
      let docId = "";
      querySnapshot.forEach((doc) => (docId = doc.id));
      const object = doc(db, "newAd", docId);
      await updateDoc(object, {
        Email: userEmail,
        Price: price,
        Rent: rent,
        Area: area
      });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  const allProperties = firestoreData?.filter(
    (el) =>
      el.category === "House" ||
      el.category === "Hand" ||
      el.category === "Apartment" ||
      el.category === "Business"
  );
  const allVehicle = firestoreData?.filter(
    (el) =>
      el.category === "Bicycle" ||
      el.category === "Car" ||
      el.category === "Motorcycle" ||
      el.category === "Scooter"
  );
  return (
    <div className={classes.root}>
      <div className={classes.stats}>
        <div
          className={classes.statsItem}
          onClick={() => setshowAllProperties(true)}
        >
          <h3>{allProperties?.length}</h3>
          <p>Properties</p>
        </div>
        <div
          className={classes.statsItem}
          onClick={() => setshowAllProperties(false)}
        >
          <h3>{allVehicle?.length}</h3>
          <p>Vehcile</p>
        </div>
      </div>
      {showAllProperties ? (
        <div className={classes.allPropertiesContainer}>
          <div className={classes.modal}>
            <input
              placeholder={"Email"}
              name="Email"
              type={"email"}
              className={classes.input}
              onChange={(e) => setuserEmail(e.target.value)}
            />
            <input
              placeholder={"Price"}
              name="Price"
              className={classes.input}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              placeholder={"Area"}
              name="Area"
              className={classes.input}
              onChange={(e) => setArea(e.target.value)}
            />
            <label>Rent</label>
            <input
              type={"checkbox"}
              className={classes.input}
              onClick={() => setrent(true)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1rem 0"
            }}
          >
            <p>{`${firestoreData?.length} objects`}</p>
            <input
              type={"text"}
              placeholder="Search by Email"
              style={{ marginLeft: "2rem" }}
              onChange={handleSearch}
            />
          </div>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Price</th>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Area</th>
                <th>Phone</th>
                <th>Paid</th>
                <th>Title</th>
              </tr>
              {firestoreData &&
                firestoreData.map((el, i) => {
                  return (
                    <tr className="dash-tr" key={i}>
                      <td>
                        <img
                          src={el.uri}
                          style={{ height: "60px", width: "60px" }}
                        />
                      </td>
                      <td>{el.Price}</td>
                      <td>{el.id}</td>
                      <td>{el.Name}</td>
                      <td>{el.Email}</td>
                      <td>{el.Area}</td>
                      <td>{el.Phone}</td>
                      <td>{el.Title}</td>
                      {el.paid && (
                        <td style={{ color: "green", fontWeight: "bold" }}>
                          Paid
                        </td>
                      )}
                      {!el.paid && (
                        <td
                          style={{ cursor: "pointer" }}
                          onDoubleClick={() => handleSetPaid(el.adId)}
                        >
                          {updated ? "Updated" : "   Not paid"}
                        </td>
                      )}
                      <td
                        onClick={() => handleRemoveObject(el.adId)}
                        className={classes.remove}
                        style={{ background: el.removed && "black" }}
                      >
                        {el.removed ? "REMOVED" : "Remove"}
                      </td>
                      <td
                        onClick={() => handleUpdateObject(el.adId)}
                        className={classes.update}
                      >
                        Update
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={classes.allVehicleContainer}>
          {allVehicle?.map((el) => {
            console.log(el);
            return (
              <div className={classes.vehicleItem}>
                <h3>{el.Title} </h3>
                <p>adId: {el.adId}</p>
                <input
                  type="text"
                  placeholder={`Name:${el.Name}`}
                  name="Name"
                />
                <input
                  type="text"
                  placeholder={`Email:${el.Email}`}
                  name="Email"
                />
                <input
                  type="text"
                  placeholder={`Phone: ${el.Phone}`}
                  name="Phone"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
