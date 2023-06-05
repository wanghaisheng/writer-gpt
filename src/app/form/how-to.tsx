/* eslint-disable react/no-unescaped-entities */
import React, { Dispatch, SetStateAction } from "react";

import { Dialog } from "@components/ui/dialog";
import { DialogContent } from "@components/ui/dialog";
import { DialogHeader } from "@components/ui/dialog";
import { DialogTitle } from "@components/ui/dialog";

type Props = {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const HowToUse = ({ open, setOpen }: Props) => (
  <Dialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Guide on How to Use.</DialogTitle>
      </DialogHeader>

      <ul className="list-decimal">
        <li>Start by entering your OpenAI API key.</li>
        <li>
          Enter one or more main keywords, separating them by a line break.
          Then, click the "Generate" button to generate related keywords. You
          have the option to choose between models of GPT-3 or GPT-4.
        </li>
        <li>
          Generate secondary keywords based on the main keywords or enter them
          manually.
        </li>

        <li>
          Click on the "Generate Outline" button and patiently wait for the app
          to generate the post for you.
        </li>
      </ul>
    </DialogContent>
  </Dialog>
);
