// src/pages/EditThreadPage.tsx
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForum } from "../context/ForumContext";
import type { Thread, QNAThread } from "../types/types";
import { useAuth } from "../context/AuthContext";

const EditThread = () => {
  const { id } = useParams<{ id: string }>();
  const { getThreadById, editThread } = useForum();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const thread = getThreadById(String(id));

  // Lokala state för formuläret
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"general" | "QNA">("general");
  const [locked, setLocked] = useState(false);

  // Fyll i formuläret när tråden finns
  useEffect(() => {
    if (thread) {
      setTitle(thread.title);
      setContent(thread.content);
      setCategory(thread.category);
      setLocked(thread.locked);
    }
  }, [thread]);

  if (!thread) return <p>Tråden kunde inte hittas</p>;

  // Kontroll: Endast skaparen eller moderator kan editera
  if (currentUser?.id !== thread.creator.id && !currentUser?.isModerator) {
    return <p>Du har inte rättigheter att redigera denna tråd</p>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const baseThread = {
      ...thread,
      title,
      content,
      category,
      locked,
    };

    if (category === "QNA") {
      const updatedThread: QNAThread = {
        ...baseThread,
        category: "QNA",
        // Behåll existerande QNA-fält
        isAnswered: (thread as QNAThread).isAnswered ?? false,
        commentAnswerId: (thread as QNAThread).commentAnswerId,
      };
      editThread(updatedThread);
    } else {
      const updatedThread: Thread = {
        ...baseThread,
        category: "general",
      };
      editThread(updatedThread);
    }

    navigate(`/threads/${thread.id}`);
  };

  return (
    <div className="thread-form-container">
      <h2 className="thread-form-title">Redigera tråd</h2>
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

        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "general" | "QNA")
            }
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
          Uppdatera tråd
        </button>
      </form>

      <button
        className="locked-btn"
        onClick={() => setLocked(!locked)}
      >
        {locked ? <p>Tråden är låst</p> : <p>Tråden är öppen</p>}
      </button>
    </div>
  );
};

export default EditThread;
