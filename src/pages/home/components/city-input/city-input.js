import { Input } from "../../../../components/inputs/input";
import { Button } from "../../../../components/button/button";
import { useState } from "react";
import { Formik, Form } from "formik";
import { Formik_Input } from "../../../../components/inputs/formik-input";
import * as Yup from "yup";
import("../../../../styles/styles-home/styles-cities/cities.css");

const validationSchema = Yup.object({
  city: Yup.string().min(1, "Минимум 1 символ"),
});

const initialValues = { city: "" };

export const CityInput = ({ text, onClick }) => {
  const onSubmit = (values, { resetForm }) => {
    onClick(values.city);
    resetForm();
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <Formik_Input name="city" placeholder="Enter city" />
          <Button text={text} type="submit" />
        </Form>
      </Formik>
    </div>
  );
};
