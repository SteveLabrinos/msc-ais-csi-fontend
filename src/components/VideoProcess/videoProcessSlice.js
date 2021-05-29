import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';
import { videoSuccess } from '../Dashboard/dashboardSlice';

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
        videoDownloadError: (state, action) => {
            state.processError = action.payload;
            state.videoDownload = false;
        },
        videoDownloadSuccess: state => {
            state.videoDownload = true;
        },
        videoFramesError: (state, action) => {
            state.processError = action.payload;
            state.videoFrames = false;
        },
        videoFramesSuccess: state => {
            state.videoFrames = true;
        },
        screenTimesError: (state, action) => {
            state.processError = action.payload;
            state.screenTimes = false;
        },
        screenTimeSuccess: state => {
            state.screenTimes = true;
            state.loading = false;
            state.processError = null;
        },
        processReset: state => {
            state.processError = null;
            state.loading = false;
            state.screenTimes = false;
            state.videoFrames = false;
            state.videoDownload = false;
            state.encoding = false;
            state.dataset = false;
            state.datasetSize = null;
            state.datasetModel = null;
            state.videoProcessModel = null;
        },
    }
});


//  export the reducers to be used as actions
export const { setProcessValues, datasetError, processStart, datasetSuccess,
    encodingError, encodingSuccess, videoDownloadError, videoDownloadSuccess,
    videoFramesError, videoFramesSuccess, screenTimesError, screenTimeSuccess, processReset } = process.actions;


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

    const requestVideoDownload = async () => {
        const response = await fetch(`${baseURL}video/download/${movieId}`);

        response.ok ?
            dispatch(videoDownloadSuccess()) :
            dispatch(videoDownloadError(response.status));
    };

    const requestVideoFrames = async () => {
        const response = await fetch(`${baseURL}video/frames/${movieId}`);

        response.ok ?
            dispatch(videoFramesSuccess()) :
            dispatch(videoFramesSuccess(response.status));
    };

    const requestScreenTimes = async () => {
        const response = await
            fetch(`${baseURL}actor/screen-times/${movieId}/model/${processValues.videoProcessModel}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(screenTimeSuccess());
            dispatch(videoSuccess(data.videos));
        } else {
            dispatch(screenTimesError(response.status));
        }
    };

    dispatch(setProcessValues(processValues));
    dispatch(processStart());
    requestDatasetCreation()
        .then(() => requestDatasetEncoding()
            .then(() => requestVideoDownload()
                .then(() => requestVideoFrames()
                    .then(() => requestScreenTimes()
                        .catch(error => console.log(error)))
                    .catch(error => console.log(error)))
                .catch(error => console.log(error)))
            .catch(error => console.log(error)))
        .catch(error => console.log(error));
};


//  selectors
export const processSelector = state => state.process;

export default process.reducer;