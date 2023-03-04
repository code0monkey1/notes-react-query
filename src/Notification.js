import { useEffect, useState } from "react"

const Notification = ({error}) => {
    console.log("err:",error)


    const [message,setMessage] = useState(error)
  
   useEffect(() => {
    console.log("The status is",error)
    
    if(error) {
        setMessage(error)

            setTimeout(()=>{
        setMessage('')
      },3000)
      }

   }, [error])
   
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return  <>{message?<div style={style}>{message}</div>:''}</>
  




}

export default Notification