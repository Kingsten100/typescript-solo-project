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
  <div className='detail-thread-container'>
    <div className='thread-details'>
      <div className='thread-details'>
        <button onClick={() => navigate('/')} className='arrow-left'><img src="../public/Group 38.svg" alt="" /></button>
        <p className='center'><img src="../public/Group 31.svg" alt="" /> {thread.creator.username}</p>
        <span>{Math.floor(Math.random()* 60)} min sedan</span>

      </div>

      <div>
      {
        (currentUser?.id === thread.creator.id || currentUser?.isModerator) && (
          <button className='submit-button' onClick={() => navigate(`/threads/${thread.id}/edit`)}>
            Redigera tråd
          </button>
        )
      }
      </div>

    </div>
    
    <div className='detail-thread-title'>
      <h2>{thread.title}</h2>
      
    </div>
    <div className='detail-thread-content'>
      <p>{thread.content}</p>
    </div>
    <div className='chat-plane'>
      <div className='comments-count mb-1'>
          <div className='comments-info '>
            <img src='../public/bubble-chat 2.svg' alt=""/>
            <p>{thread.comments.length}</p>
          </div>
        </div>

        <div className='comments-count mb-1'>
          <div className='comments-info '>
            <img src='../public/airplane.svg' alt=""/>
            <p>Dela</p>
          </div>
        </div>
    </div>

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

