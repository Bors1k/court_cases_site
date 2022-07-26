import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../services/axios/index'
import Cookies from "js-cookie";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: Cookies.get('auth-token'),
        fio: Cookies.get('fio'),
        error: null
    },
    reducers: {
        signin (state, action) {
            state.token = action.payload.token
            state.error = null
        },
        setfio(state, action){
            state.fio = action.payload
        },
        signout (state) {
            state.token = null
            state.fio = ""
            state.error = null
            Cookies.remove('auth-token')
            Cookies.remove('fio')
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})

export const signinAsync = (login) => async (dispatch) => {
    await axiosInstance.post('api-token-auth/', {username: login.username, password: login.password}).then(
        function (response){
            Cookies.set('auth-token',response.data.token)
            dispatch(signin(response.data))
        }
    ).catch(function(reason){
        if (reason.code == "ERR_BAD_REQUEST"){
            dispatch(setError('Неправильные логин или пароль'))
        }
        else{
            dispatch(setError(reason.message))
        }
    })
    await axiosInstance.get('users/current-detail/').then(
        function (response){
            dispatch(setfio(response.data.fio))
            Cookies.set('fio',response.data.fio)
        }
    ).catch(function(reason){

    })
}

export const { signin, setfio, signout, setError } = authSlice.actions

export default authSlice.reducer
