export type PostSection = {
  heading: string;
  subpoints: string[];
};

export type PostStructure = {
  title: string;
  introduction: string;
  sections: PostSection[];
  faq: {
    question: string;
    answer: string;
  }[];
  conclusion: string;
};

export type CustomPrompt = {
  value: string;
  location: {
    start: number;
    end: number;
  };
};
