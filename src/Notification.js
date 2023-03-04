import { useEffect, useState } from "react"

const Notification = ({addAnecdotesMutation}) => {
    
    const [message,setMessage] = useState('')

   useEffect(() => {
      
    if(addAnecdotesMutation.isError) {
        setMessage('Error')

            setTimeout(()=>{
        setMessage('')
      },3000)
      }

   }, [])
   
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  

  return <>
  
  {
    message?<div style={style}>
     {message}
    </div>:''
  }
  
  
  </>




}

export default Notification