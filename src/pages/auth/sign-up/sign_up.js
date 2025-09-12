import { useNavigate } from "react-router-dom";
import { reg } from "../../../utils/request";
import { Formik, Form } from "formik";
import { Formik_Input } from "../../../components/inputs/formik-input";
import { ValidationSchema } from "../../../utils/validators/formik_validation";
import { InitialValues } from "../../../utils/initial/formik_initial_values";
import { useUserStore } from "../../../components/global-user/globalUser";

export function SignUp() {
  const navigate = useNavigate();
  const { fetchUser } = useUserStore();

  const validationSchema = ValidationSchema();
  const initialValues = InitialValues();

  const goToMain = async (values) => {
    try {
      const response = await reg({
        email: values.email,
        password: values.password,
        displayName: values.displayName,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      await fetchUser();
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const goToSignIn = () => {
    navigate("/sign_in");
  };

  return (
    <div>
      <h2 className="header">Страница регистрации</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={goToMain}
      >
        {({ errors, touched }) => (
          <Form>
            <Formik_Input
              name="displayName"
              type="text"
              placeholder="Введите имя"
            />

            <Formik_Input
              name="email"
              type="text"
              placeholder="Введите почту"
            />

            <Formik_Input
              name="password"
              type="password"
              placeholder="Придумайте пароль"
            />

            <button className="form_button input_wrapper" type="submit">
              Зарегистрироваться
            </button>
            <button
              type="button"
              className="form_button input_wrapper"
              onClick={goToSignIn}
            >
              Уже есть аккаунт
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
