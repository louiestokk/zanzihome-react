import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import {
  setRentFromDate,
  setRentToDate,
  setPickUpTime,
  setLeaveTime,
  getRentalData
} from "../redux-toolkit/carRentalSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  picker: {
    width: "100%",
    margin: "0.1rem 0.5rem",
    borderRadius: "5px",
    padding: "0.5rem"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem auto"
  }
});
export default function MaterialUIPickers() {
  const rentalData = useSelector(getRentalData);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFromDate = (date) => {
    dispatch(setRentFromDate(date));
  };
  const handleToDate = (date) => {
    dispatch(setRentToDate(date));
  };
  const hadlePickTime = (date) => {
    dispatch(setPickUpTime(date));
  };
  const hadleLeaveTime = (date) => {
    dispatch(setLeaveTime(date));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.container}>
        <KeyboardDatePicker
          className={classes.picker}
          format="dd/MM/yyyy"
          label="From"
          value={rentalData.rentFromDate}
          onChange={handleFromDate}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          className={classes.picker}
          label="Time"
          format="HH:mm a"
          value={rentalData.pickupTime}
          onChange={hadlePickTime}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </div>
      <div className={classes.container}>
        <KeyboardDatePicker
          className={classes.picker}
          label="To"
          format="dd/MM/yyyy"
          value={rentalData.rentTodate}
          onChange={handleToDate}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          className={classes.picker}
          label="Time"
          format="HH:mm a"
          value={rentalData.leaveTime}
          onChange={hadleLeaveTime}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
