import { createSlice } from "@reduxjs/toolkit";

const authSlicer = createSlice({
  name: "auth",
  initialState: {
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    login: {
      currentUser: JSON.parse(localStorage.getItem("user")) || null,
      isFetching: false,
      error: null,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    //register
    registerStart(state) {
      state.register.isFetching = true;
    },
    registerSuccess(state, action) {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed(state, action) {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = true;
    },

    //login

    loginStart(state) {
      state.login.isFetching = true;
    },
    loginSuccess(state, action) {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.login.error = null;
    },
    loginFailed(state, action) {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
    //logout
    logoutStart(state) {
      state.logout.isFetching = true;
    },
    logoutSuccess(state, action) {
      state.logout.isFetching = false;
      state.login.currentUser = null;
      localStorage.removeItem("user");
      state.logout.error = false;
    },
    logoutFailed(state, action) {
      state.logout.isFetching = false;
      state.logout.error = true;
      state.logout.success = false;
    },
  },
});

export const authAction = authSlicer.actions;

export default authSlicer.reducer;
