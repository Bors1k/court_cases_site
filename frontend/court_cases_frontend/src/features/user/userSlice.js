// import { createSlice } from '@reduxjs/toolkit'
// import axiosInstance from '../../services/axios/index'
// import Cookies from "js-cookie";

// export const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         fio: ,
//     },
//     reducers: {
//         signin (state, action) {
//             state.token = action.payload.token
//         },
//         signout (state) {
//             state.token = null
//         }
//     }
// })

// export const signinAsync = (login) => async (dispatch) => {
//     console.log(login)
//     const { data } = await axiosInstance.post('api-token-auth/', {username: login.username, password: login.password})
//     Cookies.set('auth-token',data.token)
//     dispatch(signin(data))


// }

// export const { signin, signout } = authSlice.actions

// export default authSlice.reducer
