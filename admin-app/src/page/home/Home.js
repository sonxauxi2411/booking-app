import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authapi";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUser(values, dispatch, navigate);
    },
  });
  return (
    <div className="">
      <div className="form-admin  d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={adminForm.handleSubmit}
          className="d-flex w-50 flex-column justify-content-center align-items-center border border-50-black p-2"
        >
          <div>
            <h3>Admin</h3>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={adminForm.handleChange}
              value={adminForm.values.email}
              size="50"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={adminForm.handleChange}
              value={adminForm.values.password}
              size="50"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
