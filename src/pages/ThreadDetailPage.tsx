import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForum } from '../context/ForumContext'
import CommentForm from '../components/CommentForm'
import { useAuth } from '../context/AuthContext'
import type { Comment, QNAThread, Thread } from '../types/types'

const bannedWords = ['fan', 'jävlar', 'korkad', 'skit' ]

const sanitizeContent = (text: string) => {
  let cleanText = text;
  bannedWords.forEach(word => {
    const regex = new RegExp(word, "gi"); // "gi" = global + case-insensitive
    cleanText = cleanText.replace(regex, "🙂🙂🙂");
  });
  return cleanText;
};

const CommentItem: React.FC<{ 
  comment: Comment, 
  threadId: string, 
  depth?: number, 
  thread: Thread | QNAThread;
}> = ({ comment, threadId, depth = 0, thread }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { addReply } = useForum();
  const { currentUser } = useAuth();
  const [replyContent, setReplyContent] = useState('');
  const { markCommentAsAnswer } = useForum()

  const isAnswer = thread.category === "QNA" && (thread as QNAThread).commentAnswerId === comment.id;


  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    
    const cleanWords = sanitizeContent(replyContent)

    const reply: Comment = {
      id: crypto.randomUUID(),
      threadId: threadId,
      parentCommentId: comment.id,
      author: currentUser?.username,
      content: cleanWords,
      creationDate: new Date().toISOString().split('T')[0],
      replies: []
    };


    addReply(threadId, comment.id, reply);
    setReplyContent('');
    setShowReplyForm(false);
  };

  const timeAgo = `${Math.floor(Math.random()*60)} min sedan`;

  
  return (
    <div className={`swedish-comment depth-${depth}`}>
      <div className="comment-main">
        <div className="comment-header">
          <div>
            <div className='space'>
            <div className='user-icon'>
              <img className='commetn-user-icon' src='../public/UserIcon.svg' alt="User" />
            </div>
              <span className="comment-author">{comment.author}</span>
              <span className="comment-time">{timeAgo}</span>
              {
                isAnswer ? <p className='answer-color'>Svaret är rätt</p>: ''
              }
            </div>
          </div>
          <div >
            
            {(thread.category === "QNA") && (currentUser?.id === thread.creator.id || currentUser?.isModerator) && (
              <button className='submit-button' onClick={() => markCommentAsAnswer(threadId, comment.id)}>
                {isAnswer ? "Rätt svar" : "Markera som svar"}
              </button>
            )}
          </div>
        </div>
        
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>

        <div className="comment-actions">
          <button 
            className="reply-btn"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Svara
          </button>
        </div>

        {showReplyForm && (
          <div className="reply-form-swedish">
            <textarea
              placeholder="Delta i samtalet"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="reply-input-swedish"
              required
            />
            <div className="reply-actions">
              <button type="button" onClick={handleReplySubmit} className="reply-submit-swedish">
                Svara
              </button>
              <button 
                type="button" 
                onClick={() => setShowReplyForm(false)}
                className="reply-cancel-swedish"
              >
                Avbryt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies-swedish">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              threadId={threadId}
              depth={depth + 1}
              thread={thread}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ThreadDetailPage = () => {

  const { id } = useParams<{ id: string }>()
  const { getThreadById } = useForum()
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

    <div className='comments-section'>
        {thread.comments.length > 0 ? (
          <div className='comments-list'>
            {thread.comments.map((comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                threadId={thread.id}
                thread={thread}
                depth={0}
              />
            ))}
          </div>
        ) : (
          <div className='no-comments'>
            <p>Inga kommentarer än</p>
          </div>
        )}
      </div>
  </div>
);

}

export default ThreadDetailPage

