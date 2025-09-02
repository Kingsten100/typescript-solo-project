export type User = {
  id: number;
  username: string;
  email: string;
};

export type Comment = {
  id: number;
  threadId: string;
  author: string;
  content: string;
  creationDate: string;
};

export type Thread = {
  id: number;
  title: string;
  category: string;
  content: string;
  creator: User;
  creationDate: string;
  comments: Comment[];
};

type QNAThread =  Thread & {
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number;
}
