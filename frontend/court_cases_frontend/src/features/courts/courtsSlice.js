import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../services/axios/index'


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
        builder.addCase(updateCourt.pending, (state, actions)=>{
            state.status = 'updating'
        })
        .addCase(updateCourt.fulfilled, (state, actions)=>{
            state.status = 'update-succeded'
        })
        .addCase(updateCourt.rejected, (state, actions)=>{
            state.status = 'error'
            state.err = actions.error.message
        })
        builder.addCase(createCourt.pending, (state, actions)=>{
            state.status = 'creating-court'
        })
        .addCase(createCourt.fulfilled, (state, actions)=>{
            state.status = 'court-created'
            state.courts.push(actions.payload)
        })
        .addCase(createCourt.rejected, (state, actions)=>{
            state.status = 'error'
            state.err = actions.error.message
        })
    }
})

export const getCourts = createAsyncThunk('courts/getCourts', async (reverse_ordering = false)=>{
    
    if (reverse_ordering){
        var url = 'courts/?ordering=reverse'
    }
    else{
        var url = 'courts/'
    }
    const response = await axiosInstance.get(url)
    return response.data
})

export const updateCourt = createAsyncThunk('courts/update', async (court)=>{
    const response = await axiosInstance.put(`courts/${court.id}/update/`, court)

    return response.data

})

export const createCourt = createAsyncThunk('courts/create', async (court)=>{
    const response = await axiosInstance.post(`courts/create/`, court)

    return response.data
})


export const selectCourts = (state) => state.courts.courts

export const selectFilteredCourts = createSelector(
    selectCourts,
    (state)=>state.filter.filters,
    (courts, filters)=>{
        if (filters == null || filters==''){
            return courts
        }
        return courts.filter((court)=>{
            for (const key in court) {
                if(`${court[key]}`.toLowerCase().includes(`${filters}`.toLowerCase())){
                    return true
                }
            }
            return false
        })
    }
)

export const {  } = courtsSlice.actions

export default courtsSlice.reducer
