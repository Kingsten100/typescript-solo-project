import React, { createContext, useContext, useEffect, useState } from "react";
import type { Thread, Comment, User, QNAThread } from "../types/types";
import { saveToStorage, loadFromStorage } from "../utils/storage";

type ForumContextType = {
  threads: Thread[];
  addThread: (thread: Thread) => void;
  addComment: (threadId: string, comment: Comment) => void; // ändrat till string
  getThreadById: (id: string) => Thread | undefined;
  markCommentAsAnswer: (threadId: string, commentId: string) => void
  editThread: (updatedThread: Thread) => void
  addReply: (threadId: string, parentCommentId: string, reply: Comment) => void;
};

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>(() =>
    loadFromStorage<Thread[]>("threads", [])
  );

 

  useEffect(() => {
    saveToStorage("threads", threads);
  }, [threads]);

  const markCommentAsAnswer = (threadId: string, commentId: string) => {
    setThreads((prev) => 
      prev.map((t) => {
        if (t.id === threadId && t.category === 'QNA') {
          return {
            ...t,
            isAnswered: true,
            commentAnswerId: commentId,
          } as QNAThread;
        }
        return t
      })
    )
  }

  const editThread = (updatedThread: Thread) => {
    setThreads((prev) => 
    prev.map((t) => (t.id === updatedThread.id ? updatedThread : t)))
  }

  
 

  const addThread = (thread: Thread) => setThreads((prev) => [...prev, thread]);

  const addComment = (threadId: string, comment: Comment) => { // ändrat till string
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: [...t.comments, comment] } : t
      )
    );
  };

  const addReply = (threadId: string, parentCommentId: string, reply: Comment) => {
    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), { ...reply, replies: [] }]
          };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        return comment;
      });
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: addReplyToComment(t.comments) } : t
      )
    );
  };

  const getThreadById = (id: string) => threads.find((t) => t.id === id);



  return (
    <ForumContext.Provider value={{ threads, addThread, addComment, getThreadById, markCommentAsAnswer, editThread, addReply }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) throw new Error("useForum must be used inside ForumProvider");
  return context;
};
