import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { dashboardSelector, fetchMovie, fetchVideos,
    videoClear, setDisplayVideoDurations } from './dashboardSlice';
import { calculateScreenTimes } from '../VideoProcess/videoProcessSlice';
import SearchForm from './SearchForm';
import MovieCard from './MovieCard';
import Videos from './Videos';
import ProcessForm from './ProcessForm';
import Modal from '../../UI/Modal/Modal';
import VideoProcess from '../VideoProcess/VideoProcess';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { processReset } from '../VideoProcess/videoProcessSlice';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 26/5/2021.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignItems: 'stretch'
    },
    fixedHeight: {
        height: 240,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    searchForm: {
        margin: theme.spacing(2)
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
    },
}));


export default function Dashboard () {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { movieLoading, movieError, movie, displayVideoDuration,
        videos, videoLoading, videoError} = useSelector(dashboardSelector);

    // movie search field value handler
    const [query, setQuery] = useState('inception');

    // calling the reducer to get the movie
    const onFetchMovie = useCallback(event => {
        event.preventDefault();
        dispatch(videoClear());
        dispatch(fetchMovie(query));
    }, [dispatch, query]);

    // calling the reducer to get the movie's videos
    const onFetchVideos = useCallback(() => {
        dispatch(fetchVideos(movie.id));
    }, [dispatch, movie]);

    // handle showing screen time processing modal window
    const [processVisible, setProcessVisible] = useState(false);

    const handleProcessVisible = () => {
        setProcessVisible(!processVisible);
    };

    // set the user parameters for the process and open the modal window
    const onProcessVideo = (event, processValues) => {
        event.preventDefault();
        handleProcessVisible();
        dispatch(calculateScreenTimes(movie.id, processValues));
        // return  handleProcessVisible();
    };

    // display actor's duration for the videos
    const handleDisplayDurations = () => {
        if (processVisible) {
            // close the modal window for new movies process calculation
            handleProcessVisible();
        }
        dispatch(setDisplayVideoDurations());
        dispatch(processReset());
    };


    // displaying elements
    const displayMovie = movieLoading ?
        <LoadingProgress /> :
        movieError ?
            <Typography variant="h5" color="textPrimary">
                <ErrorOutlineIcon style={{ fontSize: 30, paddingRight: 12, paddingTop: 10 }}/>
                {`Δεν βρέθηκαν δεδομένα για την ταινία ${query}. Επιλέξτε νέα ταινία`}
            </Typography> :
            movie ?
                <MovieCard videoRequest={onFetchVideos} /> : null;

    const displayVideos = videoLoading ?
        <LoadingProgress /> :
        videoError ?
            <Typography variant="h5" color="textPrimary">
                <ErrorOutlineIcon style={{ fontSize: 30, paddingRight: 12, paddingTop: 10 }}/>
                {`Δεν ήταν δυνατή η ανάκτηση Video από το YouTube για την ταινία ${movie.title}. Επιλέξτε νέα ταινία`}
            </Typography> :
            videos.length !== 0 ?
                <Videos videoList={videos} durationShow={displayVideoDuration} /> : null;

    const displayProcessVideo = videos.length === 0 || displayVideoDuration ?
        null :
        videos[0].actors.length === 0 ?
            <ProcessForm clicked={onProcessVideo} /> :
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" component="p" color="textSecondary">
                    Ο χρόνος εμφάνισης των ηθοποιών έχει ήδη υπολογιστεί για τη συγκεκριμένη ταινία
                </Typography>
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleDisplayDurations}
                    className={classes.submit}
                >
                    Εμφάνιση Αποτελεσμάτων
                </Button>
            </Paper>


    return (
        <React.Fragment>
            <CssBaseline />
            <Modal show={processVisible}>
                <VideoProcess clicked={handleDisplayDurations} />
            </Modal>
            <SearchForm
                submit={onFetchMovie}
                classes={classes}
                input={setQuery}
                query={query} />
            {displayMovie}
            {displayVideos}
            {displayProcessVideo}
        </React.Fragment>
    );
}