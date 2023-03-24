import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filters: '',
    current_page: 1,
    items_per_page: 25,
    items_count: 0
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filtersChanged(state, actions){
        state.filters = actions.payload
    },
    pageChanged(state, actions){
      state.current_page = actions.payload
    },
    changeItemsCount(state, actions){
      state.items_count = actions.payload
    }
  }
});

export const {filtersChanged, pageChanged, changeItemsCount} = filterSlice.actions

export default filterSlice.reducer