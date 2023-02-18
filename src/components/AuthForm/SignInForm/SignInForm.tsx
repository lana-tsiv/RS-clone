import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import style from "./SignInForm.module.scss";
import { validationUserSignIn } from "./schema";
import Input from "@/components/common/Input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "@/store/store";
import { setUserDisplayName, setUserEmail } from "@/slices/main";
import Button from "@/components/common/Button";
import ErrorLabel from "@/components/common/ErrorLabel";
import GoogleButton from "@/components/Header/GoogleButton";
import { auth } from '@/firebaseClient/clientApp';

interface ISignInForm {
  toggleForm: () => void;
  closeModal: () => void;
}

const SignInForm = ({ closeModal, toggleForm }: ISignInForm) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(validationUserSignIn),
    defaultValues: {
      yupResolver: yupResolver(validationUserSignIn),
      email: "",
      password: "",
    },
  });

  const userDisplayNameHandler = (userDisplayName: string | null) =>
    dispatch(setUserDisplayName({ userDisplayName }));
  const userEmailHandler = (userEmail: string | null) =>
    dispatch(setUserEmail({ userEmail }));

  const handleSendSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userDisplayNameHandler(userCredential.user.displayName);
        userEmailHandler(userCredential.user.email);
        reset();
        closeModal();
      })
      .catch((err) => {
        console.log("OOPS");
        setFormError(true);
      });
  };

  return (
    <div className={style.signInForm}>
      <Input
        name="email"
        placeholder="Email"
        onInput={handleEmailChange}
        register={register}
        errorText={errors.email?.message as string}
      />
      <Input
        name="password"
        placeholder="password"
        onInput={handlePasswordChange}
        register={register}
        type="password"
        errorText={errors.password?.message as string}
      />
      <div className={style.errorWrapper}>
        {formError && (
          <ErrorLabel isFormLabel errorText="Email or password are wrong" />
        )}
      </div>
      <GoogleButton closeModal={closeModal} />
      <Button clickHandler={handleSubmit(handleSendSignIn)} text="Sign In" />

      <div className={style.redirectWrapper}>
        Dont have an account?
        <span onClick={toggleForm} className={style.redirect}>
          &nbsp;Register
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
