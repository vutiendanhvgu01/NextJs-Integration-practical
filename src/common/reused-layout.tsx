import React, { FC } from "react";
import Footer from "./footer";
import HeaderMain from "./header";



const ResusedLayout: FC<any> = ({ children }) => {
  return (
    <>
      <HeaderMain />
      <main>{children}</main>
      <Footer />
    </>
  )
};

export default ResusedLayout;
