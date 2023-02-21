import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSilce = createSlice({
  name: "auth",
  initialState: {
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

export const authActions = authSilce.actions;

const store = configureStore({ reducer: authSilce.reducer });

export default store;
