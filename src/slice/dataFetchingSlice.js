import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import userApi from "../api/userApi";
import postApi from "../api/postApi";

const initialState = { post: [], user:[], postLoading: true, userLoading:true };

export const getPosts = createAsyncThunk("getPosts", async () =>{
      const res = await axios.get(postApi);
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
          state.postLoading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
          state.postLoading = false;
          state.post = action.payload;
        });
        builder.addCase(getPosts.rejected, (state) => {
          state.postLoading = false;
        });

        //get users
        builder.addCase(getUsers.pending, (state) => {
            state.userLoading = true;
          });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.userLoading = false;
            state.user = action.payload;
          });
        builder.addCase(getUsers.rejected, (state) => {
            state.userLoading = false;
          });

      }
})

export default dataFetchingSlice.reducer;