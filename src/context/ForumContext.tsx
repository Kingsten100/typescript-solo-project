import React, { createContext, useContext, useEffect, useState } from "react";
import type { Thread, Comment } from "../types/types";
import { saveToStorage, loadFromStorage } from "../utils/storage";

type ForumContextType = {
  threads: Thread[];
  addThread: (thread: Thread) => void;
  addComment: (threadId: number, comment: Comment) => void;
  getThreadById: (id: number) => Thread | undefined;
};

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>(() =>
    loadFromStorage<Thread[]>("threads", [])
  );

  useEffect(() => {
    saveToStorage("threads", threads);
  }, [threads]);

  const addThread = (thread: Thread) => setThreads((prev) => [...prev, thread]);

  const addComment = (threadId: number, comment: Comment) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: [...t.comments, comment] } : t
      )
    );
  };

  const getThreadById = (id: number) => threads.find((t) => t.id === id);

  return (
    <ForumContext.Provider value={{ threads, addThread, addComment, getThreadById }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) throw new Error("useForum must be used inside ForumProvider");
  return context;
};
