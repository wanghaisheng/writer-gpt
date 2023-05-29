import React from "react";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <main className="flex flex-col items-center justify-center gap-y-3 h-screen">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] text-center">
        ✨🤖 ChatGPT Article Writer✨
      </h1>
      <span className="text-lg text-muted-foreground sm:text-xl text-center">
        Work in Progress.
      </span>
    </main>
  );
};

export default HomePage;
