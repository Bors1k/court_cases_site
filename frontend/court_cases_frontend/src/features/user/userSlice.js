import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios/index'
import Cookies from "js-cookie";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        surename: '',
        patronymic: '',
        email: '',
        is_admin: false,
        is_chief: false
    },
    reducers: {
    },
    extraReducers(builder){
        builder.addCase(getProfileInfoAsync.fulfilled, (state, action)=>{
            state.name = action.payload.name
            state.surename = action.payload.surename
            state.patronymic = action.payload.patronymic
            state.email = action.payload.email
            state.is_admin = action.payload.is_admin
            state.is_chief = action.payload.is_chief
        })
    }
})

export const getProfileInfoAsync = createAsyncThunk('users/getInfo', async () => {
    const response = await axiosInstance.get('users/current-detail/')
    return response.data.userInfo
})

export const { } = userSlice.actions

export default userSlice.reducer
