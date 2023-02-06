import React, {ReactNode} from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function Layout({children}:{children: ReactNode}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
