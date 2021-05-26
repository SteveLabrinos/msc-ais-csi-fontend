import { configureStore } from '@reduxjs/toolkit';

import dashboardReducer from '../components/Dashboard/dashboardSlice'

/** @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.*/

const store = configureStore({
    //  apply all the reducers from the slices
    reducer: {
        dashboard: dashboardReducer,
    }
});

export default store;