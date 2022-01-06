const form_reducer = (state, action) => {
  if (action.type === "SET_PRICE") {
    const { price } = action.payload;
    return { ...state, amount: price };
  }
};
export default form_reducer;
