import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios/index'
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
    console.log(login)
    const { data } = await axiosInstance.post('api-token-auth/', {username: login.username, password: login.password})
    Cookies.set('auth-token',data.token)
    await axiosInstance.get('users/current-detail/').then(
        function (response){
            dispatch(setfio(response.data.fio))
            Cookies.set('fio',response.data.fio)
        }
    )
    dispatch(signin(data))
}

export const { signin, setfio, signout } = authSlice.actions

export default authSlice.reducer
