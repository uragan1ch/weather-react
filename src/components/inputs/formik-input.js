import { ErrorMessage, useField } from "formik";
import "./input.css";
import("../../styles/styles-auth/auth.css");

export function Formik_Input({ label, name, placeholder, type }) {
  const [field] = useField(name);
  return (
    <div className="input_wrapper">
      {label && <label className="input_label">{label}</label>}
      <input
        className="input"
        name={name}
        placeholder={placeholder}
        type={type}
        value={field.value}
        onChange={field.onChange}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  );
}
