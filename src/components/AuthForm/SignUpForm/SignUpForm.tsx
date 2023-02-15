import React, { useState, useEffect } from "react";

import style from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUserSignUp } from "./schema";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { main } from "@/store/selectors";
import { setUserDisplayName, setUserEmail } from "@/slices/main";
import ErrorLabel from "../../common/ErrorLabel/ErrorLabel";
import GoogleButton from "@/components/Header/GoogleButton";

interface ISignUpForm {
  toggleForm: () => void;
  closeModal: () => void;
}

const SignUpForm = ({ closeModal, toggleForm }: ISignUpForm) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastname(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPassword(e.target.value);

  const userDisplayNameHandler = (userDisplayName: string | null) =>
    dispatch(setUserDisplayName({ userDisplayName }));
  const userEmailHandler = (userEmail: string | null) =>
    dispatch(setUserEmail({ userEmail }));

  const handleSendSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: `${name} ${lastname}`,
        })
          .then(() => {
            userDisplayNameHandler(userCredential.user.displayName);
            userEmailHandler(userCredential.user.email);
            reset();
            closeModal();
          })
          .catch((err) => {
            console.log("...oops", err);
          });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setFormError(true);
          console.log("in use");
        } else setFormError(false);
        console.log("...oops", err.code);
      });
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(validationUserSignUp),
    defaultValues: {
      yupResolver: yupResolver(validationUserSignUp),
      name: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <div className={style.signUpForm}>
      <Input
        name="name"
        placeholder="Name"
        onInput={handleNameChange}
        register={register}
        errorText={errors.name?.message as string}
      />
      <Input
        name="lastname"
        placeholder="Lastname"
        onInput={handleLastnameChange}
        register={register}
        errorText={errors.lastname?.message as string}
      />
      <Input
        name="email"
        placeholder="email"
        onInput={handleEmailChange}
        register={register}
        errorText={errors.email?.message as string}
      />
      <Input
        name="password"
        placeholder="password"
        type="password"
        onInput={handlePasswordChange}
        register={register}
        errorText={errors.password?.message as string}
      />
      <Input
        name="passwordConfirm"
        placeholder="Password Confirm"
        type="password"
        onInput={handlePasswordConfirmChange}
        register={register}
        errorText={errors.passwordConfirm?.message as string}
      />
      <div className={style.errorWrapper}>
        {formError && (
          <ErrorLabel
            isFormLabel
            errorText="Sorry, user with this email already exists..."
          />
        )}
      </div>
      <GoogleButton closeModal={closeModal} />
      <Button clickHandler={handleSubmit(handleSendSignUp)} text="Sign Up" />
      <div className={style.redirectWrapper}>
        Account already exists?
        <span onClick={toggleForm} className={style.redirect}>
          &nbsp;Sign In
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
