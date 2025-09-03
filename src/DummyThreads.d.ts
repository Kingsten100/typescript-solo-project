// dummyThreads.ts
export type Comment = {
  id: number;
  author: string;
  text: string;
};

export type Thread = {
  id: number;
  author: string;
  title: string;
  body: string;
  kategori: string;
  comments: Comment[];
};

// Dummydata för trådar
export const dummyThreads: Thread[] = [
  {
    id: 1,
    creator: "Alice",
    title: "Min första tråd",
    content: "Hej allihopa! Det här är mitt första inlägg i forumet.",
    category: "Allmänt",
    creationDate: '2022',
    comments: [],
  },
  {
    id: 2,
    creator: "Bob",
    title: "Tips på bra filmer",
    content: "Vilka filmer tycker ni är bäst just nu?",
    category: "Underhållning",
    creationDate: '2020',
    comments: [],
  },
  {
    id: 3,
    creator: "Charlie",
    title: "Hjälp med TypeScript",
    content: "Kan någon förklara skillnaden mellan interface och type?",
    category: "Programmering",
    creationDate: '2010',
    comments: [],
  },
];
