import React from 'react';
import styles from './404.module.scss'
import Button from "@/components/common/Button";
import {useRouter} from "next/router";

const Page404 = () => {
    const router = useRouter();
    return (
            <div className={styles.infoWrap}>
                <h2 className={styles.title}>404</h2>
                <h2 className={styles.title}>Page Not Found</h2>
                <p className={styles.text}>We’re sorry. The page you requested could no be found. Please go back to the home page</p>
                <Button isSecondary={false} text={'Go Home'} clickHandler={() => router.push('/')}/>

            </div>
    );
};

export default Page404;