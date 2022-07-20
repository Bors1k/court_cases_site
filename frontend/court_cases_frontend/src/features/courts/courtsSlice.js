import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios/index'


export const courtsSlice = createSlice({
    name: 'courts',
    initialState: {
        courts: [],
        status: 'idle',
        err: null
    },
    reducers: {
        
    },
    extraReducers(builder){
        builder.addCase(getCourts.pending, (state, actions)=>{
            state.status = 'loading'
        })
        .addCase(getCourts.fulfilled, (state, actions)=>{
            state.status = 'courts-succeded'
            state.courts = actions.payload
        })
        .addCase(getCourts.rejected, (state, actions)=>{
            state.status = 'error'
            state.err = actions.error.message
        })
    }
})

export const getCourts = createAsyncThunk('courts/getCourts', async ()=>{
    const response = await axiosInstance.get('courts/')
    return response.data
})

export const selectCourts = (state) => state.courts.courts

export const {  } = courtsSlice.actions

export default courtsSlice.reducer
