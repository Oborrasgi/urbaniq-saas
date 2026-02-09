import { Fragment, type PropsWithChildren } from "react";

import Footer from "./footer";
import Header from "./header";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
