import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForum } from '../context/ForumContext'
import CommentForm from '../components/CommentForm'
import { useAuth } from '../context/AuthContext'

const ThreadDetailPage = () => {

  const { id } = useParams<{ id: string }>()
  const { getThreadById } = useForum()
  const { currentUser } = useAuth()

  const thread = getThreadById(String(id))

  const [isAnswered, setIsAnsvered] = useState(false)

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
      {thread.comments.length > 0 ? (
        <ul>
          {thread.comments.map((c) => (
            <li key={c.id} className="comment-li">
              <strong>{c.author}</strong>
              <p>{c.content}</p>
              <input type="checkbox" />
              
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga kommentarer än</p>
      )}
    </div>
  </div>
);

}

export default ThreadDetailPage
