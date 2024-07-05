import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { getPosts, getUsers} from '../slice/dataFetchingSlice';
import PostList from './PostList';

const Home = () => {
  // testing Spring boot 3 APIs
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/identity/users')
  //   .then(res => setUser(res.data))
  //   .catch(err => console.error(err));
  // },[])

  const posts = useSelector(state => state.data.post);
  const postStatus = useSelector(state => state.data.postStatus);
  const users = useSelector(state => state.data.user);
  const userStatus = useSelector(state => state.data.userStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(getPosts());
      console.log('getting posts...');
    }
    if (userStatus === 'idle') {
      dispatch(getUsers());
      console.log('getting users...');
    }
  }, [postStatus, userStatus, dispatch])

  return (
    <div className='container'>
        <div className="row">
          <div className="col text-center"><h1>Question List</h1></div>
        </div>
        <div className="row">
            <div className="col-12">
                <PostList posts={posts}/>
            </div>
        </div>
    </div>
  )
}

export default Home