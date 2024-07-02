import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../slice/accountSlice";
import dataFetchingReducer from "../slice/dataFetchingSlice";

export default configureStore({
    reducer:{
        account: accountSlice,
        data: dataFetchingReducer
    }
})