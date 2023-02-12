import React, { useState } from "react";
import RedditLogo from "../common/RedditLogo";
import RedditTextLogo from "../common/RedditTextLogo";
import style from "./Header.module.scss";
import Search from "./Search";
import ReactModal from "react-modal";
import SignUpForm from '../AuthForm/SignUpForm';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAuth } from 'firebase/auth';
import { setUserDisplayName, setUserEmail } from '@/slices/main';
import { main } from '@/store/selectors';
import Button from '../common/Button';

const Header: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  
  const {
		userDisplayName,
    userEmail,
	} = useAppSelector(main);

  const dispatch = useAppDispatch();

  const isAuth = !!userDisplayName;

	const auth = getAuth();

	auth.onAuthStateChanged(user => {
		if (user) {
			dispatch(setUserDisplayName({ userDisplayName: user.displayName }));
			dispatch(setUserEmail({ userEmail: user.email }));
		}
		else {
			dispatch(setUserDisplayName({ userDisplayName: null}));
			dispatch(setUserEmail({ userEmail: null}));
		}
	});

  const openModal = () => setIsOpen(true); 

  const closeModal = () => setIsOpen(false);

  return (
    <header className={style.header}>
      <div className={style.header_logo__wrapper}>
        <RedditLogo />
        <RedditTextLogo />
      </div>
      <Search />
      <div className={style.header_buttons__wrapper}>
        <Button
          clickHandler={openModal}
          text={isAuth ? 'log out':'login'}
          isSecondary
        />
      </div>
      <div className={style.userDisplayName}>{userDisplayName}</div>
      <ReactModal
        className={style.header_modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className={style.header_modal__wrapper}>
            <Button
              clickHandler={closeModal}
              text='Close'
              isSecondary
            />
         {isSignIn ? <SignUpForm/>: null}
        </div>
      </ReactModal>
    </header>
  );
};

export default Header;
