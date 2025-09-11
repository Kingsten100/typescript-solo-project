export type User = {
  id: string; // ändrat till string
  username: string;
  email: string;
  password: string;
  isModerator?: boolean
};

export type Comment = {
  id: string; // ändrat till string
  threadId: string;
  parentCommentId?: string;
  author?:  string;
  content: string;
  creationDate: string;
  replies?: Comment[]
};

export type Thread = {
  id: string;
  title: string;
  category: "general" | "QNA"; // mer strikt typ
  content: string;
  creator: User;
  creationDate: string;
  comments: Comment[];
  locked: boolean;
};

export type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: string; // ändrat till string
};
