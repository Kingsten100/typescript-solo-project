import React from 'react'
import { useParams } from 'react-router-dom'
import { useForum } from '../context/ForumContext'
import CommentForm from '../components/CommentForm'

const ThreadDetailPage = () => {

  const { id } = useParams<{ id: string }>()
  const { getThreadById } = useForum()

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
      <div>
        <CommentForm />
      </div>
      <div>
        {thread.comments.length > 0 ? (
          <ul>
            {thread.comments.map((c) => (
              <li key={c.id} className='comment-li'>
                <strong>{c.author}</strong> 
                <p>{c.content}</p>
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
