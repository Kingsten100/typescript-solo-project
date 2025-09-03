import React from 'react'

const FakeThreadCard = () => {
  

  
  return (
    <div className='fake-thread-card'>
      <div className='thread-info'>
        <p>User 1</p> 
        <p>{Math.floor(Math.random()*60)} min</p>
        
        <div className='tag'><span>Katter</span></div>
      </div>
      <div className='thread-title'>
        <h2>Ge mig tips på vad katten ska heta i mellannamn</h2>
      </div>
      <div className='thread-body-text'>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam exercitationem soluta natus eius culpa ipsam illo deserunt delectus laborum voluptas recusandae nihil ullam perferendis voluptatibus, dolorum sint! Reprehenderit non at maxime quaerat magni! Consectetur atque expedita enim porro aut qui maiores cupiditate, molestiae nam deleniti, temporibus ex? Nihil, iure doloremque!
        </p>
      <div className='comments-count'>
        <div className='comments-info'>
          <img src='../public/bubble-chat 2.svg' alt=""/>
          <p>124</p>
        </div>
      </div>
      </div>
      <div className='thread-border' />
    </div>
  )
}

export default FakeThreadCard
