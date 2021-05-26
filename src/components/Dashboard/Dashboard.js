import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Title from '../../UI/Title/Title';
import { dashboardSelector, fetchMovie } from './dashboardSlice';
import SearchForm from './SearchForm';

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

    const { movieLoading, movieError, movie } = useSelector(dashboardSelector);
    // const { transactionLoading } = useSelector(transactionSelector);
    // const { monthlyIncome, dashboardLoading, incomes } = useSelector(dashboardSelector);

    // movie search field value handler
    const [query, setQuery] = useState('');

    //  calling the reducer to save to movie to the store
    const onFetchMovie = useCallback(event => {
        event.preventDefault();
        console.log(`calling movie with query: ${query}`);
        dispatch(fetchMovie(query));
    }, [dispatch, query]);

    // displaying elements
    const displayMovie = movieLoading ?
        <LoadingProgress /> :
        movieError ?
            <Typography component="h4">Error fetching the movie</Typography> :
            movie ?
                <Typography component="h4">Displaying movie HERE</Typography>
                : null;


    return (
        <React.Fragment>
            <CssBaseline />
            <SearchForm
                submit={onFetchMovie}
                classes={classes}
                input={setQuery}
                query={query} />

            {displayMovie}
        </React.Fragment>
    );
}