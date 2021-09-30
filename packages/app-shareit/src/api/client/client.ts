import axios from 'axios';

const author = localStorage.getItem('auth');
const client = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    Authorization: `Bearer ${author}`
  },
});


export default client;
