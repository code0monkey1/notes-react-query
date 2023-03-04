import { useMutation, useQueryClient } from 'react-query';
import Notification from './Notification';
import { ACTIONS, useNotificationDispatch } from './context/NotificationContext';
import { addAnecdotes } from "./requests";

const AnecdoteForm = () => {
  
  const clientQuery = useQueryClient()

  const notificationDispatch = useNotificationDispatch()
  
   const addAnecdotesMutation = useMutation(addAnecdotes,
    {
    onSuccess:(newAnecdote)=>{
   const anecdotes = clientQuery.getQueryData('anecdotes')
     
   console.log("the new anecdote recieved ",newAnecdote)
      clientQuery
      .setQueriesData('anecdotes',anecdotes.concat(newAnecdote))

         notificationDispatch({
          type:ACTIONS.NOTIFY,
           payload:{
            notification:"New Note Added : "+newAnecdote.content
           }
         })

         setTimeout(() =>{
           notificationDispatch({
            type:ACTIONS.CLEAR
           })
         },5000)
    },

    onError:(error) => {
       
         notificationDispatch({
          type:ACTIONS.NOTIFY,
           payload:{
            notification:error.response.data.error
           }
         })

         setTimeout(() =>{
           notificationDispatch({
            type:ACTIONS.CLEAR
           })
         },5000)
          
    }
    
  })

  const onCreate = async (event) => {
    
    event.preventDefault()

    const content = event.target.anecdote.value

    console.log("content: " + content)
    addAnecdotesMutation.mutate({content,votes:0})

    event.target.anecdote.value = ''
  }

  
  return (
    <div>
     { <Notification/>}
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm