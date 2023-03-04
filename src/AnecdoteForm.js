import { useMutation, useQueryClient } from 'react-query';

import Notification from './Notification';
import { addAnecdotes } from "./requests";
const AnecdoteForm = () => {
  
  const clientQuery = useQueryClient()
  
   const addAnecdotesMutation = useMutation(addAnecdotes,
    {
    onSuccess:(newAnecdote)=>{
   const anecdotes = clientQuery.getQueryData('anecdotes')
     
   console.log("the new anecdote recieved ",newAnecdote)
      clientQuery
      .setQueriesData('anecdotes',anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = async (event) => {
    
    event.preventDefault()

    const content = event.target.anecdote.value

    console.log("content: " + content)
    addAnecdotesMutation.mutate({content,votes:0})

    event.target.anecdote.value = ''
  }


  if(addAnecdotesMutation.isError){
     
     console.log("Error: " + addAnecdotesMutation.error.message)

  }
  
  return (
    <div>
      <Notification addAnecdotesMutation={addAnecdotesMutation}/>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm