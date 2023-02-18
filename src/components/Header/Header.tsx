import React, { useState } from "react";
import Logo from "../common/Logo";
import RedditLogo from "../common/RedditLogo";
import RedditTextLogo from "../common/RedditTextLogo";
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
import CreateCommunityModal from "./Communities/CreateCommunityModal";

const Header: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCommunityModalOpen, setCommunityModa] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignIn = () => setIsSignIn(true);
  const handleSignUp = () => setIsSignIn(false);

  const { userDisplayName } = useAppSelector(main);

  const dispatch = useAppDispatch();

  const isAuth = !!userDisplayName;

  const auth = getAuth();

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
    console.log("CALl");
    handleSearch(e.target.value);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

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
        {/* {isAuth && ( */}
        <Button
          clickHandler={() => setCommunityModa(!isCommunityModalOpen)}
          text="create community"
          isSecondary
        />
        {/* )} */}
        <Button
          clickHandler={!isAuth ? openModal : handleSendSignUp}
          text={isAuth ? "log out" : "log in"}
          isSecondary
        />
      </div>

      <ReactModal
        className={style.header_community}
        isOpen={isCommunityModalOpen}
        onRequestClose={() => setCommunityModa(!isCommunityModalOpen)}
        ariaHideApp={false}
      >
        <div className={style.header_community__wrapper}>
          <Button
            clickHandler={() => setCommunityModa(!isCommunityModalOpen)}
            text="Close"
            isSecondary
          />
        </div>
        <CreateCommunityModal />
      </ReactModal>

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
