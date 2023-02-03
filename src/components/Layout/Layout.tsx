import React, {ReactNode} from "react";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({children}:{children: ReactNode}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}
