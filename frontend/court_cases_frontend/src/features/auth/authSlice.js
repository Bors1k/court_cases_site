import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../services/axios/index'
import Cookies from "js-cookie";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: Cookies.get('auth-token'),
        fio: Cookies.get('fio')
    },
    reducers: {
        signin (state, action) {
            state.token = action.payload.token
        },
        setfio(state, action){
            state.fio = action.payload
        },
        signout (state) {
            state.token = null
            state.fio = ""
            Cookies.remove('auth-token')
            Cookies.remove('fio')
        }
    }
})

export const signinAsync = (login) => async (dispatch) => {
    await axiosInstance.post('api-token-auth/', {username: login.username, password: login.password}).then(
        function (response){
            Cookies.set('auth-token',response.data.token)
            dispatch(signin(response.data))
        }
    )
    await axiosInstance.get('users/current-detail/').then(
        function (response){
            dispatch(setfio(response.data.fio))
            Cookies.set('fio',response.data.fio)
        }
    )
}

export const { signin, setfio, signout } = authSlice.actions

export default authSlice.reducer
