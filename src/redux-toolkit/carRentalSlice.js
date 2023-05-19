import { createSlice } from "@reduxjs/toolkit";
const day = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const initialState = {
  rentFromDate: new Date(`${month + 1}/${day}/${year}`),
  rentTodate: new Date(`${month + 1}/${day + 7}/${year}`),
  pickupTime: new Date("2023-05-02T10:00:00"),
  leaveTime: new Date("2023-05-02T10:00:00"),
  rentalArea: "",
  vehicleType: "",
  totalPrice: 0,
  rentalPerson: null,
  showPaymentConfirmation: false,
  resNumber: Number(Math.floor(Math.random(100000) * 1838383))
};

const carRentalSlice = createSlice({
  name: "carRental",
  initialState,
  reducers: {
    setRentFromDate: (state = initialState, { payload }) => {
      state.rentFromDate = payload;
    },
    setRentToDate: (state = initialState, { payload }) => {
      state.rentTodate = payload;
    },
    setPickUpTime: (state = initialState, { payload }) => {
      state.pickupTime = payload;
    },
    setLeaveTime: (state = initialState, { payload }) => {
      state.leaveTime = payload;
    },
    setRentalArea: (state = initialState, { payload }) => {
      state.rentalArea = payload;
    },
    setVehicleType: (state = initialState, { payload }) => {
      state.vehicleType = payload;
    },
    setVehicleTotPrice: (state = initialState, { payload }) => {
      state.totalPrice = payload;
    },
    setRentalPerson: (state = initialState, { payload }) => {
      state.rentalPerson = payload;
    },
    setPaymentConfirmation: (state = initialState, { payload }) => {
      state.showPaymentConfirmation = payload;
    }
  }
});

export const getRentalData = (state) => state.carRental;
export const {
  setRentFromDate,
  setRentToDate,
  setPickUpTime,
  setLeaveTime,
  setRentalArea,
  setVehicleType,
  setVehicleTotPrice,
  setRentalPerson,
  setPaymentConfirmation
} = carRentalSlice.actions;

export default carRentalSlice.reducer;
