import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

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
        processError: null,
        loading: false,
    },
    reducers: {
        setProcessValues: (state, action) => {
            state.datasetSize = action.payload.datasetSize;
            state.datasetModel = action.payload.datasetModel;
            state.videoProcessModel = action.payload.videoProcessModel;
        },
        processStart: state => {
            state.processError = null;
            state.loading = true;
        },
        datasetError: (state, action) => {
            state.processError = action.payload;
            state.dataset = false;
        },
        datasetSuccess: state => {
            state.dataset = true;
        },
        encodingError: (state, action) => {
            state.processError = action.payload;
            state.encoding = false;
        },
        encodingSuccess: state => {
            state.encoding = true;
        },
    }
});


//  export the reducers to be used as actions
export const { setProcessValues, datasetError, processStart, datasetSuccess,
    encodingError, encodingSuccess } = process.actions;


//  use dispatch to include thunk and make async actions
//  begin a chain of requests / responses while informing the user for the process
export const calculateScreenTimes = (movieId, processValues) => dispatch => {
    //  set the request to download the dataset for every actor
    const requestDatasetCreation = async () => {
        const response = await fetch(`${baseURL}dataset/${movieId}/size/${processValues.datasetSize}`);

        response.ok ?
            dispatch(datasetSuccess()) :
            dispatch(datasetError(response.status));
    };

    const requestDatasetEncoding = async () => {
        const response = await fetch(`${baseURL}dataset/encoding/${movieId}/model/${processValues.datasetModel}`);

        response.ok ?
            dispatch(encodingSuccess()) :
            dispatch(encodingError(response.status));
    };

    dispatch(setProcessValues(processValues));
    dispatch(processStart());
    requestDatasetCreation()
        .then(() => requestDatasetEncoding().catch(error => console.log(error)))
        .catch(error => console.log(error));
};


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