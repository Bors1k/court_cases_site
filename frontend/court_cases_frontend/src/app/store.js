import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import courtsReducer from '../features/courts/courtsSlice'
import filterReducer from '../features/courts/filterSlice'
import notifyReducer from '../features/courts/CourtPage/CourtNotifies/notifySlice'

export default configureStore({
  reducer: {
    auth: authReducer, 
    user: userReducer,
    courts: courtsReducer,
    filter: filterReducer,
    notify: notifyReducer,
  },
})