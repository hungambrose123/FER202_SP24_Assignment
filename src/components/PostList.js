import React from 'react'
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
    return (
        <>
            {posts.map(post => (
                <div className="card" style={{ width: "30rem" }} key={post.id}>
                    <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{post.content}</h6>
                    <Link to={'/postDetail/'+post.id} className='btn btn-primary'>Detail</Link>
                    </div>
                </div>
            ))}

        </>
    );
}

export default PostList