import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../utils/request";
import { Formik_Input } from "../../../components/inputs/formik-input";
import("../../../styles/styles-auth/auth.css");

const validationSchema = Yup.object({
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
});

const initialValues = { email: "", password: "" };

export function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const goToRegister = () => {
    navigate("/sign_up");
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/home");
    } catch (err) {
      setError(
        "Ошибка при входе: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <p className="header">SignIn</p>
          <Formik_Input name="email" label="Email" type="email" />

          <Formik_Input name="password" label="Password" type="password" />

          {error && (
            <div style={{ color: "red" }}>
              Login error, probably incorrect email or password
            </div>
          )}

          <button
            className="form_button input_wrapper"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
          <button
            className="form_button input_wrapper"
            type="button"
            onClick={goToRegister}
          >
            I don't have an account
          </button>
        </Form>
      )}
    </Formik>
  );
}
