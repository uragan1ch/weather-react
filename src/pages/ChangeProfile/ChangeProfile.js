import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Formik_Input } from "../../components/inputs/formik-input";
import { useUserStore } from "../../components/global-user/globalUser";
import { putUser } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import("../../styles/change-profile/change_profile__buttons.css");

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Минимум 3 символа")
    .required("Обязательное поле"),
});

export const ChangeProfile = () => {
  const { displayName, updateDisplayName } = useUserStore();
  const initialValues = { username: displayName };

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    updateDisplayName(values.username);
    navigate("/home");
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Formik_Input name="username" label="Nickname" type="text" />
        <div className="change_profile__buttons">
          <button className="change_profile__button" type="submit">
            Save
          </button>
          <button
            className="change_profile__button"
            type="button"
            onClick={goToHome}
          >
            Go back
          </button>
        </div>
      </Form>
    </Formik>
  );
};
