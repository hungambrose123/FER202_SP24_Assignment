import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import postApi from '../api/postApi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../slice/dataFetchingSlice';

let sizeOfComment = 0; 

const PostDetail = () => {
  const { id } = useParams();
  const newCommentTitleRef = useRef();
  const newCommentBodyRef = useRef();
  const [post, setPost] = useState({});
  const userList = useSelector(state => state.data.user);
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${postApi}?id=${id}`)
    .then(res => {
      setPost(res.data);
      sizeOfComment = res.data[0].comment.length;
    })
    .catch(err => console.error(err));

    dispatch(getUsers());
  }, [id]);


  const getUsername = (userId) => {
    console.log(userList)
    return userList.filter(user => Number(user.id) === userId);
  }

  const handlePostComment = (e) => {
    e.preventDefault();
    const title = newCommentTitleRef.current.value;
    const body = newCommentBodyRef.current.value;
    const commentToPost = {
      id: ++sizeOfComment,
      commentTitle: title,
      commentBody: body,
      userId: Number(account.id)
    };
    axios.post(`${postApi}?id=${id}`, commentToPost)
    .then(res => alert('post successfull'))
    .catch(err => console.error(err));
  }



  if (!post[0]) {
    return <div>Loading</div>;
  }


  return (
    <div>
      <div className="container">
        <div>
          <h2>{post[0].title}</h2>
        </div>
        <div>
          <p>{post[0].content}</p>
        </div>
      </div>
      <div className='container'>
      {account.id === -1 && <div>Please login to post comment <Link to='/login'>Log in</Link></div>}
      {account.id !== -1 && <div className="card mb-3 newCommentCard">
              <form onSubmit={(e) => handlePostComment(e)}>
                <div className="card-body p-0 m-0">
                  <label htmlFor="title" className='px-2 fs-5 fw-bold'>Write your title</label>
                  <input type="text" className='form-control' placeholder='Title' id='title' ref={newCommentTitleRef}/>
                  <label htmlFor="body" className='px-2 fs-5 fw-bold'>Write your body</label>
                  <textarea
                    name="body"
                    id="body"
                    placeholder="Body"
                    className="form-control inputArea"
                    ref={newCommentBodyRef}
                  />
                </div>
                <div className="card-footer text-muted d-flex flex-row justify-content-between">
                  <img
                    src='https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw'
                    alt={`${account.username} avatar` || ''}
                    className="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-success fw-bolder submitCommentButton"
                    style={{ backgroundColor: "#5CB85C" }}
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>}

        {post[0].comment.map(val => {
            return <div className="card mb-3 otherCommentCard" key={val.id}>
            <div className="card-body p-0 m-0">
                <h4 className='px-3'>{val.commentTitle}</h4>
                <p className="p-4">{val.commentBody}</p>
            </div>
            <div className="card-footer text-muted d-flex flex-row justify-content-between p-2">
              <div>
                <img
                  src='https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw'
                  alt={`user avatar image`}
                  className="rounded-circle"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>
                  <Link
                    className="ms-1 commentAuthor"
                    to={"/profile/"}
                  >
                    {/* {getUsername(val.userId)} */}
                  </Link>
                </span>
                <span className="smallText">created at</span>
              </div>
              <i
                className="fa-solid fa-trash-can my-auto"
                style={{ cursor: "pointer" }}
              ></i>
          </div>
      </div>
        }
        )}
      </div>
    </div>
  );
};

export default PostDetail;
