import React from 'react'
import type { Thread } from '../types/types'


type ThreadCardProps = {
  thread: Thread
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
  

  
  return (
    <div className='thread-card'>
      <div className='thread-info'>
        {/* TODO Lägg till thread.author istället för user 1 */}
        <p>User 1 {thread.creator.username}</p> 
        <p>{Math.floor(Math.random()*60)} min</p>
        <div className='tag'><span>{thread.category}</span></div>
      </div>
      <div className='thread-title'>
        {/* TODO Lägg till thread.title*/}
        <h2>{thread.title}</h2>
      </div>
      <div className='thread-body-text'>
        {/* TODO Lägg till thread.body */}
        <p>
          {thread.content}
        </p>
      <div className='comments-count'>
        <div className='comments-info'>
          <img src='../public/bubble-chat 2.svg' alt=""/>
          {/* TODO Lägg till thread.comments.length */}
          <p>{thread.comments.length}</p>
        </div>
      </div>
      </div>
      <div className='thread-border' />
    </div>
  )
}

export default ThreadCard
