import React, {ReactNode} from "react";
import Footer from "@/components/Footer";

export default function Layout({children}:{children: ReactNode}) {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    )
}
