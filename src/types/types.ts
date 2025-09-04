export type User = {
  id: string; // ändrat till string
  username: string;
  email: string;
};

export type Comment = {
  id: string; // ändrat till string
  threadId: string;
  author: string;
  content: string;
  creationDate: string;
};

export type Thread = {
  id: string;
  title: string;
  category: "general" | "QNA"; // mer strikt typ
  content: string;
  creator: User;
  creationDate: string;
  comments: Comment[];
};

export type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: string; // ändrat till string
};
