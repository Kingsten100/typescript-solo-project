// src/components/ThreadForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useForum } from "../context/ForumContext";
import type { Thread, QNAThread } from "../types/types";
import { useNavigate } from "react-router-dom";

const ThreadForm = () => {
  const { addThread } = useForum();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"general" | "QNA">("general");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const baseThread = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      creationDate: new Date().toISOString(),
      creator: {
        id: crypto.randomUUID(), // ändrat till string-ID
        username: author,
        email: "", // placeholder tills vidare
      },
      comments: [],
    };

    if (category === "QNA") {
      const newThread: QNAThread = {
        ...baseThread,
        category: "QNA",
        isAnswered: false,
      };
      addThread(newThread);
    } else {
      const newThread: Thread = {
        ...baseThread,
        category: "general",
      };
      addThread(newThread);
    }

    // reset
    setTitle("");
    setAuthor("");
    setContent("");
    setCategory("general");

    navigate("/threads");
  };

  return (
    <div className="thread-form">
      <h2>Skapa ny tråd</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="author">Författare</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as "general" | "QNA")}
          >
            <option value="general">General</option>
            <option value="QNA">Q&A</option>
          </select>
        </div>

        <div>
          <label htmlFor="content">Innehåll</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit">Skapa tråd</button>
      </form>
    </div>
  );
};

export default ThreadForm;
