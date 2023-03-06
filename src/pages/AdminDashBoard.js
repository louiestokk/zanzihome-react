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
    width: "100%"
  }
});

const AdminDashBoard = () => {
  const classes = useStyles();
  const [firestoreData, setfirestoreData] = useState();
  const [updated, setupDated] = useState(false);
  const fetchFirestoreData = async () => {
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setfirestoreData(newData);
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
    const newItems = firestoreData?.map((el) => el.Name === e.target.value);
    setFirestoreData(newItems);
  };
  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <div className={classes.root}>
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
          placeholder="Search by name"
          style={{ marginLeft: "2rem" }}
          onChange={handleSearch}
        />
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Area</th>
          <th>Phone</th>
          <th>Paid</th>
        </tr>
        {firestoreData &&
          firestoreData.map((el) => {
            return (
              <tr>
                <td>{el.Name}</td>
                <td>{el.Email}</td>
                <td>{el.Area}</td>
                <td>{el.Phone}</td>
                {el.paid && (
                  <td style={{ color: "green", fontWeight: "bold" }}>Paid</td>
                )}
                {!el.paid && (
                  <td
                    style={{ cursor: "pointer" }}
                    onDoubleClick={() => handleSetPaid(el.adId)}
                  >
                    {updated ? "Updated" : "   Not paid"}
                  </td>
                )}
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default AdminDashBoard;
