import React, { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import style from "./Layout.module.scss";

function Layout({ children }: { children: ReactNode }) {

  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.content}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;