import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: -1,
    username: null,
    password: null
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setCurrentAccount: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        removeCurrentAccount:(state) => {
            state.id = initialState.id;
            state.username = initialState.username;
            state.password = initialState.password;
        }
    }
})

export const {setCurrentAccount, removeCurrentAccount} = accountSlice.actions;
export default accountSlice.reducer;