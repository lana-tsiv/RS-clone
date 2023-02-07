import SearchImage from "../../../../public/icons/search-interface-symbol.png";
import Image from "next/image";
import { ChangeEvent } from "react";
import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div className={styles.search_wrap}>
      <Image className={styles.search__icon} src={SearchImage} alt="search" />
      <input className={styles.search} type="text" placeholder="Search" />
    </div>
  );
};

export default Search;
