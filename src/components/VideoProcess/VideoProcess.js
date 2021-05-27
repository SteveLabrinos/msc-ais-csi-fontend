import React from 'react';
import { useSelector } from 'react-redux';
import { processSelector } from './videoProcessSlice';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 27/5/21.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginBottom: theme.spacing(1)
    },
}));

export default function VideoProcess() {
    const classes = useStyles();
    const { dataset, encoding } = useSelector(processSelector);

    const displayDatasetCreation = !dataset ?
        <Paper className={classes.paper}>
            <Typography variant="h5" color="secondary" component="p">
                Δημιουργία της βάσης γνώσεις με φωτογραφίες για τους ηθοποιούς της ταινίας
            </Typography>
        </Paper> :
        <Paper className={classes.paper}>
            <Typography variant="h5" color="secondary" component="p">
                Η βάση γνώσης ολοκληρώθηκε
            </Typography>
        </Paper>;

    const displayDatasetEncoding = dataset ?
        !encoding ?
            <Paper className={classes.paper}>
                <Typography variant="h5" component="p" color="secondary">
                    Κωδικοποίηση των προσώπων από την βάση γνώσης με τη χρήση νευρωνικού δικτύου
                </Typography>
            </Paper> :
            <Paper className={classes.paper}>
                <Typography variant="h5" component="p" color="secondary">
                    Η κωδικοποίηση των προσώπων της βάσης γνώσης ολοκληρώθηκε
                </Typography>
            </Paper>
        : null;


    return (
        <React.Fragment>
            {displayDatasetCreation}
            {displayDatasetEncoding}
        </React.Fragment>
    );
}