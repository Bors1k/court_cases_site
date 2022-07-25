import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../services/axios/index'
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
        clearUser: (state)=>{
            state.userInfo = {
                    name: '',
                    surename: '',
                    patronymic: '',
                    email: '',
                    is_admin: false,
                    is_chief: false
                }
            state.status = 'idle'
            state.error = null
            }
    },
    extraReducers(builder){
        builder.addCase(getProfileInfoAsync.pending, (state, action)=>{
            state.status = 'loading-info'
        })
        .addCase(getProfileInfoAsync.fulfilled, (state, action)=>{
            state.status = 'succeded-info'
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
        builder.addCase(updatePassword.pending, (state, action) => {
            state.status = 'updating-password'
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.status = 'updated-password'
            
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(updateProfile.pending, (state, action)=>{
            state.status = 'updating-profile'
        })
        .addCase(updateProfile.fulfilled, (state,action)=>{
            state.status = 'updated-profile'
            state.userInfo.name = action.payload.name
            state.userInfo.surename = action.payload.surename
            state.userInfo.patronymic = action.payload.patronymic
        })
        .addCase(updateProfile.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const getProfileInfoAsync = createAsyncThunk('user/getInfo', async () => {
    const response = await axiosInstance.get('users/current-detail/')
    return response.data.userInfo
})

export const updatePassword = createAsyncThunk('user/updatePassword', async password => {
    const response = await axiosInstance.put('users/update-password/', {'password': password})
    return response.data
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (data) =>{
    const response = await axiosInstance.put('users/update-info/', data)
    return response.data
})

export const { clearUser } = userSlice.actions

export const selectUser = state => state.user.userInfo

export default userSlice.reducer
