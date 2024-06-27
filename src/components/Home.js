import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement } from '../slice/counterSlice';

const Home = () => {
  // testing Spring boot 3 APIs
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/identity/users')
  //   .then(res => setUser(res.data))
  //   .catch(err => console.error(err));
  // },[])

  const counter = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className='container'>
        <h1>Counter value: {counter}</h1>
        <button className='btn btn-success' onClick={() => dispatch(increment())}>Increment</button>
        <button className='btn btn-danger' onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Home