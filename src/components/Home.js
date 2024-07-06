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
    <div className='container-fluid homeBody'>
        <div className="row text-center mt-2 banner">
          <div className="col-3"></div>
          <div className="col-6 bg-primary">
            Community Q&A <span><i class="fa-brands fa-react"></i></span>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row bg-primary text-light mb-3 banner2">
          <h4 className='fw-light display-6'>Community Q&A is for everyone who has a curious mind and want to learn more.
          </h4>
          <h4 className='fw-light'>To ask a question <span><i className="fa-solid fa-question p-1"></i></span>, click on "Create question" next to "Home".
          </h4>
          <h4 className='fw-light'>To answer others question <span><i className="fa-regular fa-comments p-1"></i></span>, click on "Detail/Answer" of a question below question list.
          </h4>
          <i className="fa-regular fa-hand-point-down text-center mt-2 display-5"></i>
        </div>


        <div className="container">
          <div className="row">
            <div className="col text-center"><h1>Question List</h1></div>
          </div>
          <div className="row">
              <div className="col-12">
                  <PostList posts={posts}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Home