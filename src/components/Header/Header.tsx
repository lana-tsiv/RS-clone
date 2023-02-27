import React, { useState } from "react";
import Logo from "../common/Logo";
import RedditLogo from "../common/RedditLogo";
import RedditTextLogo from "../common/RedditTextLogo";
import NextLink from "next/link";
import style from "./Header.module.scss";
import Search from "./Search";
import ReactModal from "react-modal";
import SignUpForm from "../AuthForm/SignUpForm";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAuth, signOut } from "firebase/auth";
import {
  setUserDisplayName,
  setUserEmail,
  setSearchValue,
} from "@/slices/main";
import { main } from "@/store/selectors";
import Button from "../common/Button";
import SignInForm from "../AuthForm/SignInForm";
import { auth } from "@/firebaseClient/clientApp";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignIn = () => setIsSignIn(true);
  const handleSignUp = () => setIsSignIn(false);

  const { userDisplayName } = useAppSelector(main);

  const dispatch = useAppDispatch();

  const isAuth = !!userDisplayName;

  const handleSearch = (searchValue: string) =>
    dispatch(setSearchValue({ searchValue }));

  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUserDisplayName({ userDisplayName: user.displayName }));
      dispatch(setUserEmail({ userEmail: user.email }));
    } else {
      dispatch(setUserDisplayName({ userDisplayName: null }));
      dispatch(setUserEmail({ userEmail: null }));
    }
  });

  const handleSendSignUp = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out");
        dispatch(setUserDisplayName({ userDisplayName: null }));
        dispatch(setUserEmail({ userEmail: null }));
      })
      .catch((err) => {
        console.log("...oops", err);
      });
  };

  const searchHandler = (e: any) => {
    handleSearch(e.target.value);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const router = useRouter();
  return (
    <header className={style.header}>
      <div className={style.header_logo__wrapper}>
        {/* <RedditLogo />
        <RedditTextLogo /> */}
        <Logo />
      </div>
      <Search onSearch={searchHandler} />
      <div className={style.header_buttons__wrapper}>
        <div className={style.userDisplayName}>{userDisplayName}</div>
        <NextLink href="/communities">Communities</NextLink>

        {isAuth && (
          <Button
            text={"Manage account"}
            clickHandler={() => router.push("/manage-account")}
            isSecondary={true}
          />
        )}
        <Button
          clickHandler={!isAuth ? openModal : handleSendSignUp}
          text={isAuth ? "log out" : "log in"}
          isSecondary
        />
      </div>

      <ReactModal
        className={style.header_modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className={style.header_modal__wrapper}>
          <Button clickHandler={closeModal} text="Close" isSecondary />
          {!isSignIn ? (
            <SignUpForm closeModal={closeModal} toggleForm={handleSignIn} />
          ) : (
            <SignInForm closeModal={closeModal} toggleForm={handleSignUp} />
          )}
        </div>
      </ReactModal>
    </header>
  );
};

export default Header;
