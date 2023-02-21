import { createSlice } from "@reduxjs/toolkit";

//redux search
const searchSlice = createSlice({
  name: "search",
  initialState: {
    city: undefined,
    dates: [],
    options: {
      adult: undefined,
      children: undefined,
      room: undefined,
    },
  },
  reducers: {
    setSearch(state, action) {
      //console.log(action.payload);
      state.city = action.payload.destination;
      state.dates = action.payload.date;
      state.options = action.payload.options;
    },
    
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
