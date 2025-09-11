import React, { useState, type FormEvent } from 'react'
import { useForum } from '../context/ForumContext'
import type { Comment } from '../types/types'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CommentForm = () => {
  const { addComment } = useForum()
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth()

  const [content, setContent] = useState('')
  const [commentAuthor, setCommentAuthor] = useState('')
  
  if(!id) {
    return <p>Inget id hittades</p>
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const comment: Comment = {
      id: crypto.randomUUID(),
      threadId: id,
      author: currentUser?.username,
      content: content,
      creationDate: new Date().toISOString().split('T')[0]
    }
    addComment(id, comment)

    setCommentAuthor('')
    setContent('')

  }


  return (
    <div>
      <form onSubmit={handleSubmit} className='comment-form-container'>
        <div className='comment-form-input'>
          <input placeholder='Ditt namn...' className='input' type="text" id='comment-author' value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)} required/>
        </div>
        <div className='comment-form-input'>
        <textarea placeholder='Vad vill du dela med dig?' className='input comment-textbox' id='comment' value={content} onChange={(e) => setContent(e.target.value)} required/>
        </div>
        <button className='comment-submit-btn' type='submit'>Kommentera</button>
      </form>
      
    </div>
  )
}

export default CommentForm
