export type PostStructure = {
  title: string;
  introduction: string;
  sections: {
    heading: string;
    subpoints: string[];
  }[];
};
