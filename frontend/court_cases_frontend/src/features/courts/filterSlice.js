import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // user_name: null,
    // number_of_court: null, 
    // case_source_and_summ: null,
    // case_purpose: null, 
    // claim: null,
    // number_case_in_first_instance: null,
    // number_case_in_numenklature: null
    filters: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filtersChanged(state, actions){
        state.filters = actions.payload
        // state.user_name = actions.payload.user_name
        // state.number_of_court = actions.payload.number_of_court
        // state.case_source_and_summ = actions.payload.case_source_and_summ
        // state.case_purpose = actions.payload.case_purpose
        // state.claim = actions.payload.claim
        // state.number_case_in_first_instance = actions.payload.number_case_in_first_instance
        // state.number_case_in_numenklature = actions.number_case_in_numenklature
    }
  }
});



export const {filtersChanged} = filterSlice.actions

export default filterSlice.reducer