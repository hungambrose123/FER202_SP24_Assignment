import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
    const searchRef = useRef();
    const [search, setSearch] = useState('');
    const userList = useSelector(state => state.data.user);
    
    const handleSearch =(e) => {
        e.preventDefault();
        const value = searchRef.current.value;
        setSearch(value);
      }

    const getUsername = (userId) => {
        return userList.find(user => Number(user.id) === userId)?.username || 'Unknown User';
    };

    return (
        <div className='row container mb-5'>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <div className="row my-5">
                  <div className="col-10"><input type="search" className="form-control" placeholder="Search question" aria-label="Search" ref={searchRef}/></div>
                  <div className="col-2"><button className='btn btn-primary' onClick={handleSearch}>Search</button></div>
              </div>
            </form>

            <div className="col-12">
                <div className="row gap-1">
                {search === '' && posts.map(post => (
                        <div className="card col-3" style={{ minWidthidth: "3rem" }} key={post.id}>
                                <div className="card-body pb-0">
                                {post.isSolved ? <span className='badge bg-success'>Solved <i class="fa-solid fa-flag-checkered"></i></span> 
                                : <span className='badge bg-danger'>Unsolved <i class="fa-solid fa-circle-question"></i></span>}
                                <h5 className="card-title mt-3 text-truncate">{post.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted text-truncate">{post.content}</h6>
                                <Link to={'/postDetail/'+post.id} className='btn btn-primary'>Detail/Answer</Link>
                                <p className='text-muted fs-6 mt-4'>Posted by {getUsername(post.userId)}</p>
                            </div>
                        </div>
                ))}
                </div>
            </div>

            <div className="col-12">
                <div className="row gap-1">
                {search !== '' && posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).map(post => (
                        <div className="card col-3" style={{ minWidthidth: "3rem" }} key={post.id}>
                        <div className="card-body pb-0">
                        {post.isSolved ? <span className='badge bg-success'>Solved <i class="fa-solid fa-flag-checkered"></i></span> 
                        : <span className='badge bg-danger'>Unsolved <i class="fa-solid fa-circle-question"></i></span>}
                        <h5 className="card-title mt-3 text-truncate">{post.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted text-truncate">{post.content}</h6>
                        <Link to={'/postDetail/'+post.id} className='btn btn-primary'>Detail/Answer</Link>
                        <p className='text-muted fs-6 mt-4'>Posted by {getUsername(post.userId)}</p>
                    </div>
                </div>
                ))}
                </div>
           </div>

        </div>
    );
}

export default PostList