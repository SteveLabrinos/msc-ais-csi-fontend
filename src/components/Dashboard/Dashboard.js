import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { dashboardSelector, fetchMovie, fetchVideos, videoClear } from './dashboardSlice';
import SearchForm from './SearchForm';
import MovieCard from './MovieCard';
import Videos from './Videos';

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
        marginTop: theme.spacing(3),
        height: 150
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
    }
}));


export default function Dashboard () {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { movieLoading, movieError, movie,
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
                <Videos videoList={videos} /> : null;


    return (
        <React.Fragment>
            <CssBaseline />
            <SearchForm
                submit={onFetchMovie}
                classes={classes}
                input={setQuery}
                query={query} />

            {displayMovie}
            {displayVideos}
        </React.Fragment>
    );
}