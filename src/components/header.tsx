"use client";

import React, { useState } from "react";

import { HowToUse } from "@app/form/how-to";
import { Circle, Eraser, Info, Menu } from "lucide-react";

import { title } from "@config/seo";

import { useToken } from "@store/token";

import ThemeSwitch from "./ThemeSwitch";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const { token, setToken } = useToken();

  const [howToDialog, setHowToDialog] = useState<boolean>(false);

  const navigation: {
    title: string;
    icon?: JSX.Element;
    hidden?: boolean;
    onClick: () => void;
  }[] = [
    {
      title: "Clear API Key",
      hidden: !token,
      icon: <Eraser className="h-4 w-4 mr-2" />,
      onClick: () => {
        setToken(undefined);
      }
    },
    {
      title: "How To",
      icon: <Info className="h-4 w-4 mr-2" />,
      onClick: () => {
        setHowToDialog(true);
      }
    }
  ];

  return (
    <div className="flex items-center justify-between sm:justify-between gap-4">
      <h1 className="text-2xl font-semibold flex items-center mb-0">
        <Circle className="fill-blue-600 stroke-blue-600 mr-2" /> {title}
      </h1>

      <div className="hidden md:flex items-center gap-2">
        {navigation.map(
          ({ title, onClick, icon, hidden }, index) =>
            !hidden && (
              <Button key={index} variant="ghost" size="sm" onClick={onClick}>
                {icon} <span>{title}</span>
              </Button>
            )
        )}

        <ThemeSwitch />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden px-2">
            <Menu className="w-7 h-7" />
          </Button>
        </SheetTrigger>
        <SheetContent position="right" size="lg" className="flex flex-col">
          <SheetHeader>
            <h1 className="text-lg font-semibold flex items-center mb-0">
              <Circle className="fill-blue-600 stroke-blue-600 mr-2" /> {title}
            </h1>
          </SheetHeader>

          <nav className="flex items-start flex-col-reverse gap-2">
            {navigation.map(
              ({ title, onClick, icon, hidden }, index) =>
                !hidden && (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={onClick}
                  >
                    {icon} <span>{title}</span>
                  </Button>
                )
            )}
          </nav>

          <div className="flex items-center space-x-2 mt-auto">
            <ThemeSwitch />
          </div>
        </SheetContent>
      </Sheet>

      <HowToUse open={howToDialog} setOpen={setHowToDialog} />
    </div>
  );
};

export default Header;
