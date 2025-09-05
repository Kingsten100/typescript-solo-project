import React, { createContext, useContext, useEffect, useState } from "react";
import type { Thread, Comment, User } from "../types/types";
import { saveToStorage, loadFromStorage } from "../utils/storage";

type ForumContextType = {
  threads: Thread[];
  addThread: (thread: Thread) => void;
  addComment: (threadId: string, comment: Comment) => void; // ändrat till string
  getThreadById: (id: string) => Thread | undefined;
  createUser: (user: User) => void
};

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>(() =>
    loadFromStorage<Thread[]>("threads", [])
  );

  const [user, setUser] = useState<User[]>(() => (
    loadFromStorage<User[]>('users', []) 
  ))

  useEffect(() => {
    saveToStorage("threads", threads);
  }, [threads]);

  useEffect(() => {
    saveToStorage('users', user)
  }, [user])

  const addThread = (thread: Thread) => setThreads((prev) => [...prev, thread]);

  const addComment = (threadId: string, comment: Comment) => { // ändrat till string
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: [...t.comments, comment] } : t
      )
    );
  };

  const getThreadById = (id: string) => threads.find((t) => t.id === id);

  const createUser = (user: User) => setUser((prev) => [...prev, user])

  return (
    <ForumContext.Provider value={{ threads, addThread, addComment, getThreadById, createUser }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) throw new Error("useForum must be used inside ForumProvider");
  return context;
};
