import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "/public/images/logo.png";
import { useRouter } from 'next/router';

const Logo = () => {
  const router = useRouter()

  const handleNavigate = () => router.push(`/`)

  return (
    <Image
      className={styles.logo}
      src={logo}
      placeholder="blur"
      alt="Logo Image"
      width={100}
      height={48}
      onClick={handleNavigate}
    />
  );
};

export default Logo;
