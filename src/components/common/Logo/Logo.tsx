import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "/public/images/logo.png";

const Logo = () => {
  return (
    <Image
      className={styles.logo}
      src={logo}
      placeholder="blur"
      alt="Logo Image"
      width={100}
      height={48}
    />
  );
};

export default Logo;
