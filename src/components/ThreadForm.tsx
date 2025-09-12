// src/components/ThreadForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useForum } from "../context/ForumContext";
import type { Thread, QNAThread } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ThreadForm = () => {
  const { addThread } = useForum();
  const navigate = useNavigate();
  const { currentUser } = useAuth()

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"general" | "QNA">("general");
  const [locked, setLocked] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!currentUser) {
      return alert("You have to be logged in to create thread")
    }

    const baseThread = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      creationDate: new Date().toISOString().split('T')[0],
      creator: {
        id: crypto.randomUUID(),
        username: currentUser.username,
        email: "",
        password: '',
      },
      comments: [],
      locked,
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

    setTitle("");
    setAuthor("");
    setContent("");
    setCategory("general");

    navigate("/");
  };

  return (
    <div className="thread-form-container">
      <h2 className="thread-form-title">Skapa ny tråd</h2>
      <form className="thread-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        { currentUser ? null :

        <div className="form-group">
          <label htmlFor="author">Författare</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        }

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="content">Innehåll</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>


        <button className="submit-button" type="submit">
          Skapa tråd
        </button>
      </form>
        
        <button className="locked-btn" onClick={() => {setLocked(!locked)}}>{locked ? <p>Tråden är låst</p>: <p>Tråden är öppen</p>}</button>
        
    </div>
  );
};

export default ThreadForm;
