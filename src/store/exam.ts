import { create } from "zustand";

import { Question } from "@interface/questions";

export type ExamItem = {
  questions: Question[];
  timeCounter: number;
};

type Exam = {
  exam: ExamItem;
  setExam: (exam: ExamItem) => void;
};

export const useExam = create<Exam>()(set => ({
  exam: {
    questions: [],
    timeCounter: 1
  },
  setExam: exam => set({ exam })
}));
