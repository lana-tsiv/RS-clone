import * as yup from "yup";

export const validationPost = yup.object().shape({
  title: yup.string().required("This field is required"),
  text: yup.string().required("This field is required"),
});
