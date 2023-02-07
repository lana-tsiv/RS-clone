import React from "react";
import RedditLogo from "../common/RedditLogo";
import RedditTextLogo from "../common/RedditTextLogo";
import style from "./Header.module.scss";
import Search from "./Search";

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.header_logo__wrapper}>
        <RedditLogo />
        <RedditTextLogo />
      </div>
      <Search />
      <div className={style.header_buttons__wrapper}>
        <button className={style.header_buttons__button}>Get App</button>
        <button className={style.header_buttons__button}>Log In</button>
      </div>
    </header>
  );
};

export default Header;
