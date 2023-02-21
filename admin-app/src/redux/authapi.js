import instance from "../utils/axios";
import { authActions } from ".";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(authActions.loginStart());

  try {
    const res = await instance.post("/auth/admin/login", user);

    //console.log(res);
    dispatch(authActions.loginSuccess(res.data));
    navigate("/dashboard");
  } catch (error) {
    const message = error.response.data.message;
    dispatch(authActions.loginFailed(message));
    //nếu 401 - wrong password , 400 - not found user
    if (
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 402
    ) {
      alert(message);
    }
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(authActions.logoutStart());

  try {
    dispatch(authActions.logoutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(authActions.logoutFailed());
  }
};
