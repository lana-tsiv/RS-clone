import React from 'react';
import styles from './Footer.module.scss';
import GitLogo from "@/components/common/GitLogo/GitLogo";
import RSLogo from "@/components/common/RSLogo";


const Footer = () => {
    return (
        <div>
            <footer className={styles.footer}>
                <div className={styles.socialMedia}>
                    <a href='https://rs.school/js' target='_blank' rel="noreferrer">
                        <RSLogo/>
                    </a>
                </div>
                <div className={styles.contacts}>
                    <a className={styles.itemLink} href='https://github.com/vincapto' target='_blank' rel="noreferrer">
                        <GitLogo/>
                        <p className={styles.name}>Raman Lazarenka</p>
                    </a>
                    <a className={styles.itemLink} href='https://github.com/kavume' target='_blank' rel="noreferrer">
                        <GitLogo/>
                        <p className={styles.name}>Ekaterina Gorbacheva</p>
                    </a>
                    <a className={styles.itemLink} href='https://github.com/lana-tsiv' target='_blank' rel="noreferrer">
                        <GitLogo/>
                        <p className={styles.name}>Lana Tsiushkevich</p>
                    </a>
                </div>
                <p className={styles.info}>rs-clone, 2023</p>
            </footer>
        </div>
    );
};

export default Footer;