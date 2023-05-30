import React from "react";

import Form from "./form";

type Props = {};

const HomePage = (props: Props) => (
  <main className="container flex flex-col items-center justify-center gap-y-3 h-screen">
    <Form />
  </main>
);

export default HomePage;
