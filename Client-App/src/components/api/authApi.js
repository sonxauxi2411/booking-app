import instance from "../../utils/axios";
import { authAction } from "../../redux/auth";

//register User
export const registerUser = async (user, dispatch, navigate) => {
  //console.log(user);
  dispatch(authAction.registerStart());
  try {
    const res = await instance.post("/auth/register", user);
    dispatch(authAction.registerSuccess());
    navigate("/login");
  } catch (error) {
    const message = error.response.data.message;
    dispatch(authAction.registerFailed());
    if (error.response.status === 400) {
      alert(message);
    }
  }
};
//login User
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(authAction.loginStart());

  try {
    const res = await instance.post("/auth/login", user);

    //console.log(res);
    dispatch(authAction.loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    const message = error.response.data.message;
    dispatch(authAction.loginFailed(message));
    //nếu 401 - wrong password , 400 - not found user
    if (error.response.status === 400 || error.response.status === 401) {
      alert(message);
    }
  }
};
//logout User
export const logoutUser = async (dispatch, navigate) => {
  dispatch(authAction.logoutStart());

  try {
    dispatch(authAction.logoutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(authAction.logoutFailed());
  }
};
