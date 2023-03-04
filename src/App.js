import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './AnecdoteForm';
import './App.css';
import { getAnecdotes, modifyAnecdotes } from './requests';

function App() {
  
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
    }
  })
  
  if(result.isLoading){
    return <div>Loading ....</div>
  }
  
  if(result.isError){
    return <div>Anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data
  
  const handleVote =(anecdote)=>{
      console.log("handleVote",anecdote)
      modifyAnecdotesMutation.mutate({...anecdote,votes:anecdote.votes+1})
  }

 
  
   return (
    <div className="App">

      <AnecdoteForm/>
     {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
