import axios from 'axios';

const author = localStorage.getItem('auth');
//console.log('a');
const client = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    Authorization: `Bearer ${author}`
  },
});


export default client;
