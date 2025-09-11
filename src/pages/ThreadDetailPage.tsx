import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForum } from '../context/ForumContext'
import CommentForm from '../components/CommentForm'
import { useAuth } from '../context/AuthContext'
import type { QNAThread } from '../types/types'

const ThreadDetailPage = () => {

  const { id } = useParams<{ id: string }>()
  const { getThreadById, markCommentAsAnswer } = useForum()
  const { currentUser } = useAuth()

  const navigate = useNavigate()

  const thread = getThreadById(String(id))

  if(!thread){
    return (
      <div>
        <p>Tråden kunde inte hittas</p>
      </div>
    )
  }
  return (
  <div>
    <h2>{thread.title}</h2>
    <p>{thread.creator.username}</p>
    <p>{thread.content}</p>

    {thread.locked ? (
      <p>Tråd är låst</p>
    ) : currentUser ? (
      <div>
        <CommentForm />
      </div>
    ) : (
      <div>
        <p>Logga in för att delta i konversationen</p>
      </div>
    )}

    <div>

      {
        (currentUser?.id === thread.creator.id || currentUser?.isModerator) && (
          <button onClick={() => navigate(`/threads/${thread.id}/edit`)}>
            Redigera tråd
          </button>
        )
      }

    {thread.comments.length > 0 ? (
      <ul>
        {thread.comments.map((c) => {
          const isAnswer = thread.category === "QNA" && (thread as QNAThread).commentAnswerId === c.id;

          return (
            <li key={c.id} className="comment-li">
              <strong>{c.author}</strong>
              <p>{c.content}</p>
              {thread.category === "QNA" && currentUser?.id === thread.creator.id || currentUser?.isModerator === true &&(
                <button onClick={() => markCommentAsAnswer(thread.id, c.id)}>
                  {isAnswer ? <p>Rätt svar</p> : <p>Markera som svar</p>}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Inga kommentarer än</p>
    )}

    </div>
  </div>
);

}

export default ThreadDetailPage

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useForum } from "../context/ForumContext";
// import CommentForm from "../components/CommentForm";
// import { useAuth } from "../context/AuthContext";
// import type { QNAThread } from "../types/types";

// const ThreadDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { threads, getThreadById, markCommentAsAnswer } = useForum();
//   const { currentUser } = useAuth();

//   // Hämta tråden från context varje render
//   const thread = threads.find((t) => t.id === String(id))

//   if (!thread) {
//     return (
//       <div>
//         <p>Tråden kunde inte hittas</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>{thread.title}</h2>
//       <p>Skapad av: {thread.creator.username}</p>
//       <p>{thread.content}</p>

//       {thread.locked ? (
//         <p>Tråd är låst</p>
//       ) : currentUser ? (
//         <div>
//           <CommentForm />
//         </div>
//       ) : (
//         <p>Logga in för att delta i konversationen</p>
//       )}

//       <div>
//         {thread.comments.length > 0 ? (
//           <ul>
//             {thread.comments.map((c) => {
//               // Beräkna om denna kommentar är markerad som svar
//               const isAnswer =
//                 thread.category === "QNA" &&
//                 (thread as QNAThread).commentAnswerId === c.id;

//               return (
//                 <li key={c.id} className="comment-li">
//                   <strong>{c.author}</strong>
//                   <p>{c.content}</p>

//                   {thread.category === "QNA" && (
//                     <button
//                       onClick={() => markCommentAsAnswer(thread.id, c.id)}
//                     >
//                       {isAnswer ? "✅ Markerad som svar" : "Markera som svar"}
//                     </button>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>Inga kommentarer än</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ThreadDetailPage;
