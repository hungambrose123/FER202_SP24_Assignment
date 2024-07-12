import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import postApi from '../api/postApi';
import commentApi from '../api/commentApi';
import likesApi from '../api/likesApi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../slice/dataFetchingSlice';

const PostDetail = () => {
  const { id } = useParams();
  const newCommentTitleRef = useRef();
  const newCommentBodyRef = useRef();
  const editCommentForm = useRef();
  const closeModal = useRef();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [modalData, setModalData] = useState({});
  const userList = useSelector(state => state.data.user);
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();


  const getUsername = (userId) => {
    return userList.find(user => Number(user.id) === userId)?.username || 'Unknown User';
  };

  const getUserAvatar = (userId) => {
    return userList.find(user => Number(user.id) === userId)?.avatar || 'https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw';
  };

  // const getLikesCountByComment = (commentId) => {
  //   axios.get(`${likesApi}?commentId=${commentId}`)
  //   .then(res => setLikeCount(res.data.length))
  //   .catch(err => console.error(err));
  //   return likeCount;
  // }

  const handlePostComment = (e) => {
    e.preventDefault();
    const title = newCommentTitleRef.current.value;
    const body = newCommentBodyRef.current.value;
    const newComment = {
      commentTitle: title,
      commentBody: body,
      postId: Number(id),
      userId: Number(account.id)
    };
    axios.post(`${commentApi}`, newComment)
    .then(() => {
      alert('Insert new comment successful');
      newCommentTitleRef.current.value = '';
      newCommentBodyRef.current.value = '';
      refreshData();
    })
    .catch(err => console.error(err));
  };

  const handleDeleteComment = (commentId) => {
    if(window.confirm(`Do you want to delete comment id ${commentId} ?`)){
      axios.delete(`${commentApi}/${commentId}`)
      .then(res => {
        alert(`Delete comment id ${commentId} successful`);
        refreshData();
      })
      .catch(err => console.error(err));
    }
  }

  const handleModalData = (data) => {
    setModalData(data);
  }

  const handleEditComment = () => {
    const editCommentFormData = editCommentForm.current;
    const curId = modalData.id;
    const title = editCommentFormData.querySelector('#title').value;
    const body = editCommentFormData.querySelector('#body').value;
    axios.patch(`${commentApi}/${curId}`,{commentTitle: title, commentBody: body})
    .then(res => {
      alert('Edit comment successful');
      refreshData();
      closeModal.current.click();
    })
    .catch(err => console.error(err));
  }

  const handleSolve = () => {
    if(window.confirm("Do you want to set this post as solved ?, this action cannot be returned.")){
      axios.patch(`${postApi}/${id}`, {isSolved: !post.isSolved})
      .then(res => {
        alert("solved successfully !");
        refreshData();
      })
      .catch(err => console.error(err));
    }
  }

  const refreshData = () => {
    axios.get(`${postApi}?id=${id}`)
    .then(res => {
      setPost(res.data);
    })
    .catch(err => console.error(err));
    axios.get(`${commentApi}?postId=${id}`)
    .then(res => {
      setComment(res.data);
    })
    .catch(err => console.error(err));

    dispatch(getUsers());
  }

  useEffect(() => {
    refreshData();
  }, [id]);

  if (!post[0]) {
    return <div>Loading</div>;
  }

  console.log(post[0].userId, account.id)

  return (
    <div className="container py-5">
      <div>
        {post[0].isSolved ? <span class="badge bg-success fs-4">Solved <i class="fa-solid fa-flag-checkered"></i></span>
        : <span class="badge bg-danger fs-4">Unsolved <i class="fa-solid fa-circle-question"></i></span>}
        {(Number(post[0].userId) === Number(account.id) && post[0].isSolved === false) && <button className='btn btn-success ms-3 mb-2' onClick={handleSolve}>Change to solved <i class="fa-solid fa-check"></i></button>}
      </div>
      <div className='p-3 my-2 border border-3 border-warning'>
        <h2><span class="badge bg-warning">Question </span> <span className='text-warning'>{post[0].title}</span></h2>
      </div>
      <div className='p-3 my-2 border border-3 border-secondary'>
        <h3><span class="badge bg-info text-dark">Detail </span> <p className='fw-normal'>{post[0].content}</p></h3>
      </div>
      <div className='container'>
        {account.id === -1 && (
          <div className='py-4'>Please login to post a comment/answer <Link to='/login' className='btn btn-primary'>Log in <i class="fa-solid fa-right-to-bracket"></i></Link></div>
        )}
        {account.id !== -1 && !post[0].isSolved && (
          <div className="card mb-3 newCommentCard">
            <form onSubmit={handlePostComment}>
              <div className="card-body p-0 m-0">
                <label htmlFor="title" className='px-2 fs-5 fw-bold p-2'><span className='badge bg-danger'>Title</span></label>
                <input type="text" className='form-control' placeholder='Write your title here...' id='title' ref={newCommentTitleRef} required/>
                <label htmlFor="body" className='px-2 fs-5 fw-bold p-2'><span className='badge bg-info'>Body</span></label>
                <textarea
                  name="body"
                  id="body"
                  placeholder="Write your body here..."
                  className="form-control inputArea"
                  style={{minHeight: '30vh'}}
                  ref={newCommentBodyRef}
                  required
                />
              </div>
              <div className="card-footer text-muted d-flex flex-row justify-content-between">
                <img
                  src={account.avatar}
                  alt={`${account.username} avatar`}
                  className="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                />
                <button
                  type="submit"
                  className="btn btn-success fw-bolder"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        )}
        <div className='text-center p-3'><h3>Comments/Answers</h3></div>
        {comment.map(val => (
          <div className="card mb-3 otherCommentCard" key={val.id}>
            <div className="card-body p-0 m-0">
              {/* <div className='px-3 my-2'>
                <span className='badge bg-success me-2'>Like: {() => getLikesCountByComment(val.id)}</span>
                <button className='badge bg-secondary'><i class="fa-regular fa-heart"></i></button>
                </div> */}
              <p className='px-3 my-2'>
                <span class="badge bg-warning me-auto">Title</span>
                <div className='pb-0'>{val.commentTitle}</div>
              </p>
              <p className="px-3 py-2">
                <span class="badge bg-info">Body</span>
                <div className='pt-2 fs-6'>{val.commentBody}</div>
                </p>
            </div>
            <div className="card-footer text-muted d-flex flex-row justify-content-between p-2">
              <div>
                <span className="smallText"> answer by </span>
                <span className='me-2'>
                  <b className="ms-1 commentAuthor">
                    {getUsername(val.userId)} {val.userId === Number(account.id) && '(you)'}
                  </b>
                </span>
                <img
                  src={getUserAvatar(val.userId)}
                  alt={`user avatar`}
                  className="rounded-circle"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              {val.userId === Number(account.id) && <div className='my-auto'>
                <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleModalData(val)}>Edit <i class="fa-solid fa-pencil"></i></button>
                <button className='btn btn-danger ms-2' onClick={() => handleDeleteComment(val.id)}>Delete <i className="fa-solid fa-trash-can"></i></button>
                </div>}
            </div>
          </div>
        ))}
      </div>

        <div>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Edit comment</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <form ref={editCommentForm}>
              <div>
                <label htmlFor="title" className='px-2 fs-5 fw-bold p-2'><span className='badge bg-danger'>Title</span></label>
                <input type="text" className='form-control' placeholder='Write your title here...' id='title' value={modalData.commentTitle} onChange={(e) => setModalData({...modalData, commentTitle: e.target.value})} required/>
                <label htmlFor="body" className='px-2 fs-5 fw-bold p-2'><span className='badge bg-info'>Body</span></label>
                <textarea
                  name="body"
                  id="body"
                  placeholder="Write your body here..."
                  className="form-control inputArea"
                  value={modalData.commentBody}
                  onChange={(e) => setModalData({...modalData, commentBody: e.target.value})}
                  style={{minHeight: '30vh'}}
                  required
                />
              </div>
            </form>
      </div>
      <div class="modal-footer">
      <b className="ms-1 commentAuthor">
        {account.username} (You)
      </b>
      <img
                  src={account.avatar}
                  alt={`${account.username} avatar`}
                  className="rounded-circle me-auto"
                  style={{ width: "30px", height: "30px" }}
                />
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={closeModal}>Close</button>
        <button type="button" class="btn btn-primary" onClick={handleEditComment}>Save change</button>
      </div>
    </div>
  </div>
</div>
        </div>


    </div>
  );
};

export default PostDetail;
