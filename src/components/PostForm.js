import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import postApi from '../api/postApi';
import { getPosts } from '../slice/dataFetchingSlice';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();
    const account = useSelector(state => state.account);
    const postList = useSelector(state => state.data.post);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getPosts());
}, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(account.id === -1){
            alert('Please log in first');
            nav('/login');
        }else{
            const newPost = {
                id: Number(postList.length+1),
                title: title,
                content: content,
                isSolved: false,
                userId: Number(account.id)
            }
            axios.post(postApi, newPost)
            .then(res => {
                alert('Create question successful');
                dispatch(getPosts());
            })
            .catch(err => console.error(err));
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="container">
            <h1>Create a question</h1>
            {account.id === -1 && <h4 style={{minHeight: '70vh'}}>Please login to create question <Link to='/login' className='btn btn-primary'>Login <i class="fa-solid fa-right-to-bracket"></i></Link></h4>}
            {account.id !== -1 && <form onSubmit={handleSubmit}>
                <label htmlFor="postTitle" className='badge bg-info text-dark p-2 m-2'>Question title</label>
                <input
                    type="text"
                    className='form-control w-50 mb-4'
                    placeholder="Write your title"
                    value={title}
                    id='postTitle'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="postContent" className='badge bg-info text-dark p-2 m-2'>Question content</label>
                <textarea
                    placeholder="Write your content"
                    className='form-control'
                    value={content}
                    id='postContent'
                    style={{minHeight: '40vh'}}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='btn btn-primary my-3' type="submit">Create question</button>
            </form>}
        </div>
    );
};

export default PostForm;