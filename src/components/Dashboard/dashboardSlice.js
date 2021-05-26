import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

export const dashboard = createSlice({
    name: 'dashboard',
    initialState: {
        movie: null,
        movieLoading: false,
        movieError: null,
        videos: [],
        videoLoading: false,
        videoError: null
    },
    reducers: {
        movieStart: state => {
            state.movieLoading = true;
        },
        movieFail: (state, action) => {
            state.movieError = action.payload;
            state.movieLoading = false;
        },
        movieSuccess: (state, action) => {
            state.movie = action.payload;
            state.movieLoading = false;
            state.movieError = null;
        },
        videoStart: state => {
            state.videoLoading = true;
        },
        videoFail: (state, action) => {
            state.videoError = action.payload;
            state.videoLoading = false;
        },
        videoSuccess: (state, action) => {
            state.videos = action.payload;
            state.videoLoading = false;
            state.videoError = null;
        },
    }
});

//  export the reducers to be used as actions
export const { movieStart, movieFail, movieSuccess,
    videoStart, videoFail, videoSuccess } = dashboard.actions;

//  use dispatch to include thunk and make async actions
export const fetchMovie = query => dispatch => {
    const getMovie = async () => {
        const response = await fetch(`${baseURL}movie/alias/${query}`);

        response.ok ?
            dispatch(movieSuccess(await response.json())) :
            dispatch(movieFail(response.status));
    };

    dispatch(movieStart());
    getMovie().catch(error => console.log(error));
};

// export const fetchIncomesPerMonth = token => dispatch => {
//     const getIncomesPerMonth = async () => {
//         const response = await fetch(`${baseURL}transactions/income/monthly?tokenId=${token}`);
//
//         if (response.ok) {
//             dispatch(incomesPerMonthSuccess(await response.json()));
//         } else {
//             dispatch(incomeFail(response.status));
//         }
//     };
//
//     dispatch(incomeStart());
//
//     getIncomesPerMonth().catch(error => console.log(error));
// };

//  selectors
export const dashboardSelector = state => state.dashboard;

export default dashboard.reducer;