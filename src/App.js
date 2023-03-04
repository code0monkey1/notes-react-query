import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './AnecdoteForm';
import Anecdotes from './Anecdotes';
import './App.css';
import { ACTIONS, useNotificationDispatch } from './context/NotificationContext';
import { getAnecdotes, modifyAnecdotes } from './requests';

function App() {

  const notificationDispatch = useNotificationDispatch()
  
  const result = useQuery('anecdotes',getAnecdotes,{
    retry:false,
    refetchOnWindowFocus:false,
  })

  const clientQuery = useQueryClient();
 
 
  const modifyAnecdotesMutation = useMutation(modifyAnecdotes,{

    onSuccess:(modifiedAnecdote)=>{

      const anecdotes = clientQuery
      .getQueryData('anecdotes')
     
      clientQuery.setQueryData('anecdotes', anecdotes.map((anecdote)=> anecdote.id===modifiedAnecdote.id?modifiedAnecdote:anecdote))
      
      //Notify

       notificationDispatch({
        type:ACTIONS.NOTIFY,
        payload:{
          notification:"Vote increased"
        }
      })

      //Clear Notification
     setTimeout(()=>{

      notificationDispatch({
            type:ACTIONS.CLEAR
          })
          
     },5000)
    
    }
  })
  
  if(result.isLoading){
    return <div>Loading ....</div>
  }
  
  if(result.isError){
    return <div>Anecdote service not available due to problems in the server</div>
  }
  
  const handleVote =(anecdote)=>{
      console.log("handleVote",anecdote)
      modifyAnecdotesMutation.mutate({...anecdote,votes:anecdote.votes+1})
  }

 
  
   return (
    <div className="App">
      <AnecdoteForm/>
      <Anecdotes handleVote={handleVote} />
    </div>
  );
}

export default App;
