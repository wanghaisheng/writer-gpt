export type Question = {
  question: string;
  answer: boolean;
  image?: string;
  userAnswer?: boolean;
};

export type QuestionDataStructure = {
  [id: string]: Question;
};

export type QuestionData = {
  withImage: QuestionDataStructure;
  noImage: QuestionDataStructure;
};

export type LocalQuestions = {
  [id: string]: {
    score: number;
    lastVisit: number;
    count: number;
    answers: ".,.,,,...";
  };
};
