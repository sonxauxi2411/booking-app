import { configureStore } from "@reduxjs/toolkit";
import authRedicer from "./auth";
import bookingSlice from "./booking";
import searchSlice from "./search";

const store = configureStore({
  reducer: { auth: authRedicer, search: searchSlice, booking: bookingSlice },
});

export default store;
