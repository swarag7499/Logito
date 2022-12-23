import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducers/auth';
import adminauthReducer from '../reducers/authAdmin';
import projectReducer from '../reducers/project-reducers';
import adminReducer from '../reducers/admin';
import profileReducer from '../reducers/profile-reducers';
import homePage from '../reducers/homePage';

export const store = configureStore({
    reducer: {
        authReducer,
        adminauthReducer,
        projectReducer,
        adminReducer,
        profileReducer,
        homePage
    }
})