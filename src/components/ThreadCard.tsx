import React from 'react'
import type { Thread } from '../types/types'
import { Link } from 'react-router-dom'


type ThreadCardProps = {
  thread: Thread
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
  

  
  return (
    <>
      <div className='thread-card'>
        <div className='thread-info'>
          <p>{thread.creator.username}</p> 
          <p>{thread.creationDate}</p>
          <div className='tag'><span>{thread.category}</span></div>
        </div>
        <div className='thread-title'>
          <Link to={`/threads/${thread.id}`} className='thread-link'>
            <h2>{thread.title}</h2>
          </Link>
        </div>
        <div className='thread-body-text'>
          <p>
            {thread.content}
          </p>
        <div className='comments-count'>
          <div className='comments-info'>
            <img src='../public/bubble-chat 2.svg' alt=""/>
            <p>{thread.comments.length}</p>
          </div>
        </div>
        </div>
      </div>
        <div className='thread-border' />
    
    </>
  )
}

export default ThreadCard
