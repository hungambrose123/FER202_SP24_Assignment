import React from 'react'
import { useSelector } from 'react-redux'
import PostList from './PostList';
import { Link } from 'react-router-dom';

const UserQuestionList = () => {
    const allQuestions = useSelector(state => state.data.post);
    const account = useSelector(state => state.account);
    const posts = allQuestions.filter(question => question.userId === account.id);

  return (
    <div className='container'>
        {account.id === -1 && <div className='container' style={{height:'70vh'}}>
            <h3>Please login to view your questions <span><Link to={'/login'} className='btn btn-primary'>Login <i class="fa-solid fa-right-to-bracket"></i></Link></span></h3>
        </div>}
        {account.id !== -1 && <PostList posts={posts}/>}
    </div>
  )
}

export default UserQuestionList