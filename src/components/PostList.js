import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
    const searchRef = useRef();
    const [search, setSearch] = useState('');

    const handleSearch =(e) => {
        e.preventDefault();
        const value = searchRef.current.value;
        setSearch(value);
      }
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
                                <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{post.content}</h6>
                                <Link to={'/postDetail/'+post.id} className='btn btn-primary'>Detail/Answer</Link>
                            </div>
                        </div>
                ))}
                </div>
            </div>

            <div className="col-12">
                <div className="row gap-1">
                {search !== '' && posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).map(post => (
                        <div className="card col-3" style={{ minWidthidth: "5rem" }} key={post.id}>
                                    <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{post.content}</h6>
                                    <Link to={'/postDetail/'+post.id} className='btn btn-primary'>Detail/Answer</Link>
                                </div>
                        </div>
                ))}
                </div>
           </div>

        </div>
    );
}

export default PostList