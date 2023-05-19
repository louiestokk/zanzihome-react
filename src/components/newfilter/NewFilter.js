import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core";
import { villages } from "../../utils/data";
import { BiSearch } from "react-icons/bi";
import { searchOptioons } from "../../utils/searchOptionsData";
import {
  getFilteredQuerys,
  setSearchQuery
} from "../../redux-toolkit/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: "94%",
    maxWidth: "700px",
    height: "220px",
    background: "white",
    marginTop: "2rem",
    borderRadius: "5px",
    marginBottom: "1rem",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  container: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginLeft: "0.5rem",
    width: "100%"
  },
  btn: {
    position: "absolute",
    zIndex: 10000,
    top: "20%",
    color: "gray"
  },
  btns: {
    position: "absolute",
    zIndex: 10000,
    top: "20%",
    color: "gray",
    right: "33%"
  },
  icon: {
    fontSize: "1.2rem"
  },
  search: {
    background: "#0b8b3a",
    color: "white",
    height: "2.6rem",
    width: "90vw",
    maxWidth: "500px"
  },
  img: {
    width: "45px",
    height: "45px"
  },
  imgcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  imgHolder: {
    textAlign: "center",
    cursor: "pointer"
  },
  imgp: {
    fontSize: "0.8rem"
  }
});
const NewFilter = () => {
  const [filtering, setfiltering] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const searchData = useSelector(getFilteredQuerys);
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      searchData.searchQuery === "Properties" ||
      searchData.searchQuery === "House" ||
      searchData.searchQuery === "Apartment" ||
      searchData.searchQuery === "Plot" ||
      searchData.searchQuery === "Business"
    ) {
      history.push("/properties-zanzibar");
    } else {
      history.push("/car-rental-zanzibar");
    }
  };

  return (
    <div className="filter-filter-holder">
      <div className={classes.root}>
        <h3
          style={{
            marginLeft: "0.5rem",
            fontSize: "1.3rem",
            letterSpacing: "0.5px",
            marginTop: "0.3rem"
          }}
        >
          Explore Zanzibar
        </h3>
        <p className="newfilter-p">
          {/* Find properties, accommodation, rent vehicles or book tours, taxis and
          safaris! */}
          Find properties, accommodation or rent and book vehicles!
        </p>

        <div className={classes.container}>
          <button
            className={classes.btn}
            style={{ display: filtering ? "none" : "block" }}
          >
            <BiSearch className={classes.icon} />
          </button>
          <Autocomplete
            onChange={(e) => {
              setfiltering(true);
              e.preventDefault();
              dispatch(setSearchQuery(e.target.innerText));
            }}
            background="white"
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={searchOptioons.map((option) => option.option)}
            renderInput={(params) => (
              <TextField
                style={{
                  backgroundColor: "white",
                  width: "90vw",
                  maxWidth: "500px",
                  height: "2.6rem",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  padding: "0.5rem"
                }}
                {...params}
                placeholder="      What do you want to search for?"
                margin="normal"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  disableUnderline: true
                }}
              />
            )}
          />
        </div>
        {/* <div className={classes.container}> */}
        {/* <select
            name="Area"
            style={{
              border: "1px solid gray",
              background: "transparent",
              width: "250px",
              height: "2.6rem",
              padding: "0.5rem"
            }}
            onChange={handleAreaChange}
          >
            <option>Whole Zanzibar</option>
            {villages?.map((el, i) => (
              <option key={i}>{el}</option>
            ))}
          </select> */}

        <button className={classes.search} onClick={handleSearch}>
          Search
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default NewFilter;
