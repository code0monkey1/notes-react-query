import React from 'react'
import { useQueryClient } from 'react-query'

function Anecdotes({handleVote}) {

    const clientQuery = useQueryClient()
    
   const anecdotes = clientQuery
      .getQueryData('anecdotes')

  return (
    <div> {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}</div>
  )
}

export default Anecdotes