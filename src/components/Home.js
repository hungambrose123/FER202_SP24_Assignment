import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { getPosts, getUsers} from '../slice/dataFetchingSlice';

const Home = () => {
  // testing Spring boot 3 APIs
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/identity/users')
  //   .then(res => setUser(res.data))
  //   .catch(err => console.error(err));
  // },[])

  const posts = useSelector(state => state.data.post);
  const postStatus = useSelector(state => state.data.postLoading);
  const users = useSelector(state => state.data.user);
  const userStatus = useSelector(state => state.data.userLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(getUsers());
    }
    if (userStatus === 'idle') {
      dispatch(getPosts());
    }
  }, [postStatus, userStatus, dispatch])

  // useEffect(() => {
  //   console.log(posts)
  //   console.log(users)
  // }, [posts,users]);

  return (
    <div className='container'>
        <button onClick={()=> {
          dispatch(getUsers());
          console.log(users.length);
        }}>Get users list</button>
    </div>
  )
}

export default Home