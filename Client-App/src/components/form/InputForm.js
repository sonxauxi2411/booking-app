import "./inputForm.css";

const Input = ({ type = "text", formik, placeholder, name }) => {
  return (
    <div className="form-input">
      <input
        className={`form-control ${formik.errors[name] && "is-invalid"}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
      />
      {formik.touched[name] && (
        <div className="text-danger">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
