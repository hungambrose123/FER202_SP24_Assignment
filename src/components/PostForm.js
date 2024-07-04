import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
                id: postList.length+1,
                title: title,
                content: content,
                comment: [],
                userId: Number(account.id)
            }
            axios.post(postApi, newPost)
            .then(res => {
                console.log('post successful');
                dispatch(getPosts());
            })
            .catch(err => console.error(err));
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='form-control'
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    className='form-control'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='btn btn-primary' type="submit">Post question</button>
            </form>
        </div>
    );
};

export default PostForm;