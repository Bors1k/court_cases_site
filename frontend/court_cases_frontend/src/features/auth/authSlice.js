import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../services/axios/index'
import Cookies from "js-cookie";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: Cookies.get('auth-token'),
        fio: Cookies.get('fio'),
        is_admin: Cookies.get('is_admin') == 'false' ? false: true,
        is_chief: Cookies.get('is_chief')== 'false' ? false: true,
        error: null
    },
    reducers: {
        signin (state, action) {
            state.token = action.payload.token
            state.error = null
        },
        setfio(state, action){
            console.log(action.payload.fio)
            state.fio = action.payload.fio
            if(action.payload.userInfo != undefined){
                state.is_admin = action.payload.userInfo.is_admin
                state.is_chief = action.payload.userInfo.is_chief
            }
        },
        signout (state) {
            state.token = null
            state.fio = ""
            state.error = null
            Cookies.remove('auth-token')
            Cookies.remove('fio')
            Cookies.remove('is_admin')
            Cookies.remove('is_chief')
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
            dispatch(setfio(response.data))
            Cookies.set('fio',response.data.fio)
            Cookies.set('is_admin',response.data.userInfo.is_admin)
            Cookies.set('is_chief',response.data.userInfo.is_chief)
        }
    ).catch(function(reason){

    })
}

export const { signin, setfio, signout, setError, setAttributes } = authSlice.actions

export default authSlice.reducer
