import React, { useState } from "react";
import RedditLogo from "../common/RedditLogo";
import RedditTextLogo from "../common/RedditTextLogo";
import style from "./Header.module.scss";
import Search from "./Search";
import ReactModal from "react-modal";
import ModalLogIn from "./ModalLogIn";
import CloseLogo from "../common/CloseLogo";
import translate from "@/i18n/translate";

const Header: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header className={style.header}>
      <div className={style.header_logo__wrapper}>
        <RedditLogo />
        <RedditTextLogo />
      </div>
      <Search />
      <div className={style.header_buttons__wrapper}>
        <button className={style.header_buttons__button}>
            {translate('header.button.getApp')}
        </button>
        <button className={style.header_buttons__button} onClick={openModal}>
            {translate('header.button.logIn')}
        </button>
      </div>
      <ReactModal
        className={style.header_modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className={style.header_modal__wrapper}>
          <button className={style.header_modal__close} onClick={closeModal}>
            <CloseLogo />
          </button>
          <ModalLogIn />
        </div>
      </ReactModal>
    </header>
  );
};

export default Header;
