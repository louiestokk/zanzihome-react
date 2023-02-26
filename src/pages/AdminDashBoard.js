import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
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
    textAlign: "center"
  }
});

const AdminDashBoard = () => {
  const classes = useStyles();
  const [firestoreData, setfirestoreData] = useState();
  const fetchFirestoreData = async () => {
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setfirestoreData(newData);
    });
  };
  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <div className={classes.root}>
      <p>{`${firestoreData?.length} objects`}</p>
      <ul>
        {firestoreData &&
          firestoreData?.map((el) => {
            console.log(el);
            return (
              <li key={el.adId} className={classes.listItem}>
                <p>
                  Area: <span>{el.Area}</span>
                </p>
                <p>
                  Email: <span>{el.Email}</span>
                </p>
                <p>
                  Name:<span> {el.Name}</span>
                </p>
                <p>
                  Phone:<span> {el.Phone}</span>
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AdminDashBoard;
