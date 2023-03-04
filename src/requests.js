import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes =()=>axios.get(baseUrl).then(res => res.data)

export const modifyAnecdotes =(modifiedAnecdote)=>axios.put(`${baseUrl}/${modifiedAnecdote.id}`,modifiedAnecdote).then(res => res.data)

export const addAnecdotes = (newAnecdote)=>axios.post(`${baseUrl}`,newAnecdote).then(res => res.data)