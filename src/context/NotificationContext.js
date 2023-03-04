
import { createContext, useContext, useReducer } from "react"

export const ACTIONS = {
  NOTIFY:"notify",
  CLEAR:"clear",
}

const notificationReducer=(state,action)=>{
    
  switch(action.type){
     
     case ACTIONS.NOTIFY:
      console.log("notification",action.payload.notification)
      return action.payload.notification
     
     case ACTIONS.CLEAR:
      console.log("clear action triggered")
      return ''
    
      default:
        return state
  }
}

const NotificationContext = createContext()


export const NotificationContextProvider =(props)=>{

  const [notification,notificationDispatch]= useReducer(notificationReducer,'')

   return <NotificationContext.Provider value={{notification,notificationDispatch}}>
       {props.children}
   </NotificationContext.Provider>
   
}

export const useNotification =()=>{
  const {notification} = useContext(NotificationContext)
  console.log("Notification in useNotification is",notification)
  return notification
}

export const  useNotificationDispatch =()=>{
  const {notificationDispatch} = useContext(NotificationContext)
  return notificationDispatch
}