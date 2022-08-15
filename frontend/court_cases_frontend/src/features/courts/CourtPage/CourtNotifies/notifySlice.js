import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axios/index'

const initialState = {
    status: 'idle',
    notifies: [],
    err: null

}

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    clearNotifies(state, action){
        state.status = 'idle'
        state.notifies = []
        state.err = null
    }
  },
  extraReducers(builder){
    builder.addCase(getNotifiesForCourt.pending, (state,action)=>{
        state.status = 'loading'
    })
    .addCase(getNotifiesForCourt.fulfilled, (state,action)=>{
        state.notifies = action.payload
        state.status = 'notifies-succeded'
    })
    .addCase(getNotifiesForCourt.rejected, (state,action)=>{
        console.log(state)
        state.error = action.error.message
        state.status = 'no permissions'
    })
  }
});

export const getNotifiesForCourt = createAsyncThunk(`notify/getNotifies`, async (court_id)=>{
    const response = await axiosInstance.get(`notifies/${court_id}/`)

    return response.data
})

export const {clearNotifies} = notifySlice.actions

export default notifySlice.reducer