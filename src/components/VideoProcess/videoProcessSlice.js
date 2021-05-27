import { createSlice } from '@reduxjs/toolkit';
// import { baseURL } from '../../shared/utility';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 27/5/2021.
 */

export const process = createSlice({
    name: 'process',
    initialState: {
        datasetSize: null,
        datasetModel: null,
        videoProcessModel: null,
        dataset: false,
        encoding: false,
        videoDownload: false,
        videoFrames: false,
        screenTimes: false,
    },
    reducers: {
        setProcessValues: (state, action) => {
            state.datasetSize = action.payload.datasetSize;
            state.datasetModel = action.payload.datasetModel;
            state.videoProcessModel = action.payload.videoProcessModel;
        },
    }
});


//  export the reducers to be used as actions
export const { setProcessValues } = process.actions;


//  use dispatch to include thunk and make async actions
// export const fetchMovie = query => dispatch => {
//     const getMovie = async () => {
//         const response = await fetch(`${baseURL}movie/alias/${query}`);
//
//         response.ok ?
//             dispatch(movieSuccess(await response.json())) :
//             dispatch(movieFail(response.status));
//     };
//
//     dispatch(movieStart());
//     getMovie().catch(error => console.log(error));
// };


//  selectors
export const processSelector = state => state.process;

export default process.reducer;