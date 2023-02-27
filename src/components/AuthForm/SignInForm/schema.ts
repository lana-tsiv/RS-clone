import * as yup from "yup";

export const validationUserSignIn = yup.object().shape({
  email: yup.string().email().max(20).required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});
