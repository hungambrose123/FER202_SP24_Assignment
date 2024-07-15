import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
    const searchRef = useRef();
    const [search, setSearch] = useState('');
    const [curPage, setCurPage] = useState(1);
    const userList = useSelector(state => state.data.user);

    let postCount;
    if(search === ''){
        postCount = posts.length;
    }else{
        postCount = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).length;
    }
    const postPerPage = 6;
    const totalPage = Math.ceil(postCount/postPerPage);
    const lastIndex = curPage * postPerPage;
    const firstIndex = lastIndex - postPerPage;
    const numbers = [...Array(totalPage+1).keys()].slice(1);

    const prevPage = () => {
        if(curPage != firstIndex){
            setCurPage(curPage-1);
        }
    }

    const setPage = (page) => {
        setCurPage(page);
    }

    const nextPage = () => {
        if(curPage != lastIndex){
            setCurPage(curPage+1);
        }
    }

    const getUserAvatar = (userId) => {
        return userList.find(user => Number(user.id) === userId)?.avatar || 'https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw';
      };
    
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
                <div className="row gap-4">
                {search === '' && posts.slice(firstIndex, lastIndex).map(post => (
                        <div className="card col-3" style={{ minWidthidth: "3rem" }} key={post.id}>
                                <div className="card-body pb-0">
                                {post.isSolved ? <span className='badge bg-success'>Solved <i class="fa-solid fa-flag-checkered"></i></span> 
                                : <span className='badge bg-danger'>Unsolved <i class="fa-solid fa-circle-question"></i></span>}
                                <h5 className="card-title mt-3 text-truncate">{post.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted text-truncate">{post.content}</h6>
                                <Link to={'/postDetail/'+post.id} className='btn btn-primary'>Detail/Answer</Link>
                                <p className='text-muted fs-6 mt-4'>Posted by {getUsername(post.userId)}
                                <img
                                src={getUserAvatar(post.userId)}
                                alt={`user avatar`}
                                className="rounded-circle ms-2"
                                style={{ width: "20px", height: "20px" }}
                                />
                                </p>
                            </div>
                        </div>
                ))}
                </div>
            </div>

            <div className="col-12">
                <div className="row gap-1">
                {search !== '' && posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).slice(firstIndex, lastIndex).map(post => (
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

        <div className='container mt-3'>
          <p>Page: </p>
          <div className="row">
            <div className="col-12">
                {/* <button className='btn btn-primary m-1' onClick={() => prevPage()}>Prev</button> */}
                {numbers.map(value => {
                    return <button className='btn btn-primary m-1' onClick={()=> setPage(value)}>{value}</button>
                })}
                {/* <button className='btn btn-primary m-1' onClick={() => nextPage()}>Next</button> */}
                </div>
          </div>
          <p>Total pages: {totalPage}</p>
        </div>

        </div>
    );
}

export default PostList