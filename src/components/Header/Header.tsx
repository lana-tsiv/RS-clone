import React from "react";
import RedditLogo from "../common/RedditLogo";
import RedditTextLogo from "../common/RedditTextLogo";
import style from "./Header.module.scss";
import Search from "./Search";


const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <RedditLogo />
      <RedditTextLogo />
      <Search />
      <button className={style.reddit_button}>Get App</button>
      <button className={style.reddit_button}>Log In</button>
    </header>
  );
};

export default Header;
