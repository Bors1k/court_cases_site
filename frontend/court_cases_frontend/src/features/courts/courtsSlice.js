import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../services/axios/index'
import { changeItemsCount } from './filterSlice'


export const courtsSlice = createSlice({
    name: 'courts',
    initialState: {
        courts: [],
        status: 'idle',
        err: null
    },
    reducers: {
        clearCourtState: (state) => {
            state.courts = []
            state.status = 'idle'
            state.err = null
        }
    },
    extraReducers(builder){
        builder.addCase(getCourts.pending, (state, actions)=>{
            state.status = 'loading'
        })
        .addCase(getCourts.fulfilled, (state, actions)=>{
            state.status = 'courts-succeded'
            state.courts = actions.payload
            state.err = null
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
            state.err = null
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
            state.err = null
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

export const selectCourtsLength = (state) => selectFilteredCourts(state).length

export const selectFilteredCourts = createSelector(
    selectCourts,
    (state)=>state.filter,
    (courts, filter)=>{
        if (filter.filters == null || filter.filters==''){
            return courts
        }
        return courts.filter((court)=>{
            for (const key in court) {
                if(`${court[key]}`.toLowerCase().includes(`${filter.filters}`.toLowerCase())){
                    return true
                }
            }
            return false
        })
    }
)

export const selectPaginatedCourts = createSelector(
    selectFilteredCourts,
    (state)=>state.filter,
    (courts, filter)=>{
        return courts.slice((filter.current_page-1)*filter.items_per_page, filter.current_page * filter.items_per_page)
    }
)

export const { clearCourtState } = courtsSlice.actions

export default courtsSlice.reducer
