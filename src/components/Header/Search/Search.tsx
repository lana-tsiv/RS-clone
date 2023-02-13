import SearchImage from "../../../../public/icons/search-interface-symbol.png";
import Image from "next/image";
import styles from "./Search.module.scss";
import {useIntl} from "react-intl";

const Search = ({onSearch} : any) => {
    const intl = useIntl();
    const placeholder = intl.formatMessage({ id: 'header.search', defaultMessage: 'Search' });

    return (
    <div className={styles.search_wrap}>
      <Image className={styles.search__icon} src={SearchImage} alt="search" />
      <input 
        className={styles.search}
        type="text"
        placeholder={placeholder} 
        onChange={onSearch}
      />
    </div>
  );
};

export default Search;
