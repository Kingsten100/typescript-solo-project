import React from 'react'

import ThreadCard from './ThreadCard'
import { useForum } from '../context/ForumContext'
import FakeThreadCard from './FakeThreadCard'

const ThreadList = () => {
  const { threads } = useForum()

  if (!threads.length) return (
    <>
    <FakeThreadCard />
    <FakeThreadCard />
    <FakeThreadCard />
    
    </>
  )

  return (
    <div>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread}/>
      ))}
    </div>
  )
}

export default ThreadList
