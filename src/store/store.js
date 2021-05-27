import { configureStore } from '@reduxjs/toolkit';

import dashboardReducer from '../components/Dashboard/dashboardSlice';
import processReducer from '../components/VideoProcess/videoProcessSlice';

/** @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.*/

const store = configureStore({
    //  apply all the reducers from the slices
    reducer: {
        dashboard: dashboardReducer,
        process: processReducer,
    }
});

export default store;