import * as yup from "yup";

export const validationUserSignUp = yup.object().shape({
  name: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  email: yup.string().email().max(20).required("Email is required"),
  password: yup.string().min(6).required("Password is required and must be at least 6 characters long"),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
});
