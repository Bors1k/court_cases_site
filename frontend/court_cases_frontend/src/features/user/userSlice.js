import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios/index'
import Cookies from "js-cookie";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            name: '',
            surename: '',
            patronymic: '',
            email: '',
            is_admin: false,
            is_chief: false
        },
        status: 'idle',
        error: null
        
    },
    reducers: {
    },
    extraReducers(builder){
        builder.addCase(getProfileInfoAsync.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(getProfileInfoAsync.fulfilled, (state, action)=>{
            state.status = 'succeded'
            state.userInfo.name = action.payload.name
            state.userInfo.surename = action.payload.surename
            state.userInfo.patronymic = action.payload.patronymic
            state.userInfo.email = action.payload.email
            state.userInfo.is_admin = action.payload.is_admin
            state.userInfo.is_chief = action.payload.is_chief
        })
        .addCase(getProfileInfoAsync.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const getProfileInfoAsync = createAsyncThunk('users/getInfo', async () => {
    const response = await axiosInstance.get('users/current-detail/')
    return response.data.userInfo
})

export const selectUser = state => state.user.userInfo

export default userSlice.reducer
