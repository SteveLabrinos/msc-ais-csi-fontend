import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        marginRight: theme.spacing(1),
    },
}));

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/5/21.
 */

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size={24} />
        </div>
    );
}