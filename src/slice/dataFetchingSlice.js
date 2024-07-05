import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import userApi from "../api/userApi";
import postApi from "../api/postApi";

const initialState = { 
  post: [], user:[], 
  postStatus: 'idle', userStatus:'idle',
  currentPost: {}, currentPostStatus: 'idle' };

export const getPosts = createAsyncThunk("getPosts", async () =>{
      const res = await axios.get(postApi);
      return res.data;
    }
  );

export const getPostById = createAsyncThunk("getPostById", async (id) =>{
    const res = await axios.get(postApi+`?id=${id}`);
    return res.data;
  }
);

export const getUsers = createAsyncThunk("getUsers", async () =>{
      const res = await axios.get(userApi);
      return res.data;
    }
  );


  const dataFetchingSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get posts
        builder.addCase(getPosts.pending, (state) => {
          state.postStatus = 'loading';
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
          state.postStatus = 'success';
          state.post = action.payload;
        });
        builder.addCase(getPosts.rejected, (state) => {
          state.postStatus = 'rejected';
        });

        //get post by Id
        builder.addCase(getPostById.pending, (state) => {
          state.currentPostStatus = 'loading';
          state.currentPost = {};
        });
        builder.addCase(getPostById.fulfilled, (state, action) => {
          state.currentPostStatus = 'success';
          state.currentPost = action.payload;
        });
        builder.addCase(getPostById.rejected, (state) => {
          state.currentPostStatus = 'rejected';
        });

        //get users
        builder.addCase(getUsers.pending, (state) => {
            state.userStatus = 'loading';
          });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.userStatus = 'success';
            state.user = action.payload;
          });
        builder.addCase(getUsers.rejected, (state) => {
            state.userStatus = 'rejected';
          });


      }
})

export default dataFetchingSlice.reducer;