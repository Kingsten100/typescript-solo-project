import React from 'react'
import { useParams } from 'react-router-dom'
import { useForum } from '../context/ForumContext'

const ThreadDetailPage = () => {

  const { id } = useParams<{ id: string }>()
  const { getThreadById } = useForum()

  const thread = getThreadById(Number(id))

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
      <div>
        {thread.comments.length > 0 ? (
          <ul>
            {thread.comments.map((c) => (
              <li key={c.id}>
                <strong>{c.author}</strong> {c.content}
              </li>
            ))}
          </ul>
        ): (
          <p>Inga kommentarer än</p>
        )}
      </div>
    </div>
  )
}

export default ThreadDetailPage
