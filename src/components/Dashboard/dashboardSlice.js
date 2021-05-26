import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

// temporary setting
const NUMBER_OF_VIDEOS = 5;

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

export const fetchVideos = movieId => dispatch => {
    const getVideos = async () => {
        const response = await fetch(`${baseURL}video/${movieId}/total/${NUMBER_OF_VIDEOS}`);

        if (response.ok) {
            const payload = await response.json();
            dispatch(videoSuccess(payload.videos));
        } else {
            dispatch(videoFail(response.status));
        }
    };

    dispatch(videoStart());
    getVideos().catch(error => console.log(error));
};


//  selectors
export const dashboardSelector = state => state.dashboard;

export default dashboard.reducer;