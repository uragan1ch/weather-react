import * as Yup from "yup";

export function ValidationSchema() {
  return Yup.object({
    email: Yup.string().email("Неверный email").required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Минимум 6 символов")
      .required("Обязательное поле"),
  });
}
