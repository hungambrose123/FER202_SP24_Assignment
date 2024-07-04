import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postApi from '../api/postApi';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});


  useEffect(() => {
    console.log(`${postApi}?id=${id}`);
    axios.get(`${postApi}?id=${id}`)
    .then(res => setPost(res.data))
    .catch(err => console.error(err));
  }, [id]);


  if (!post[0]) {
    return <div>Loading</div>;
  }


  return (
    <div>
      <h2>{post[0].title}</h2>
      <p>{post[0].content}</p>
      <div>
            {post[0].comment.map((value) => (
            <div key={value.id}>
                <p>{value.commentTitle}</p>
                <p>{value.commentBody}</p>
            </div>
            ))}
      </div>
    </div>
  );
};

export default PostDetail;
