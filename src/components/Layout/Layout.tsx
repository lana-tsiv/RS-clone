import React, {ReactNode} from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import styles from './Layout.module.scss'

export default function Layout({children}:{children: ReactNode}) {
    return (
        <>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    )
}
