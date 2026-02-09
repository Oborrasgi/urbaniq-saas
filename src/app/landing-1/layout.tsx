import { Fragment, type PropsWithChildren } from "react";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

export default function Landing1Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
