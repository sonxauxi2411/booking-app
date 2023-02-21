import "./inputForm.css";

const ReserveInput = ({ type = "text", formik, placeholder, name, label }) => {
  return (
    <div className="form-input">
      <label>{label}</label>
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

export default ReserveInput;
