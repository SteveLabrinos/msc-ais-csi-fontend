import React from 'react';
import { useSelector } from 'react-redux';
import { processSelector } from './videoProcessSlice';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Title from '../../UI/Title/Title';
import CircularIndeterminate from '../../UI/CircularIndeterminate/CircularIndeterminate';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
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
        marginBottom: theme.spacing(1),
        minHeight: 250,
    },
    error: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
    },
    loadingTypography: {
        display: 'flex',
        marginTop: theme.spacing(1)
    }
}));

export default function VideoProcess() {
    const classes = useStyles();
    const { dataset, encoding, videoDownload,
        videoFrames, screenTimes, loading, processError } = useSelector(processSelector);

    const displayDatasetCreation = !dataset ?
        <Typography variant="h6" color="secondary" component="p" className={classes.loadingTypography}>
            <CircularIndeterminate />
            Δημιουργία της βάσης γνώσεις με φωτογραφίες για τους ηθοποιούς της ταινίας
        </Typography> :
        <Typography variant="h6" color="secondary" component="p" style={{ marginTop: 8 }}>
            <CheckIcon style={{ color: 'green' }} />
            Η βάση γνώσης ολοκληρώθηκε
        </Typography>;

    const displayDatasetEncoding = dataset ?
        !encoding ?
            <Typography variant="h6" component="p" color="secondary" className={classes.loadingTypography}>
                <CircularIndeterminate />
                Κωδικοποίηση των προσώπων από την βάση γνώσης με τη χρήση νευρωνικού δικτύου
            </Typography> :
            <Typography variant="h6" component="p" color="secondary" style={{ marginTop: 8 }}>
                <CheckIcon style={{ color: 'green' }} />
                Η κωδικοποίηση των προσώπων της βάσης γνώσης ολοκληρώθηκε
            </Typography>
        : null;

    const displayVideoFrames = videoDownload ?
        !videoFrames ?
            <Typography variant="h6" component="p" color="secondary" className={classes.loadingTypography}>
                <CircularIndeterminate />
                Εξαγωγή των καρέ των video για τον υπολογισμό χρόνου προβολής των ηθοποιών
            </Typography> :
            <Typography variant="h6" component="p" color="secondary" style={{ marginTop: 8 }}>
                <CheckIcon style={{ color: 'green' }} />
                Η εξαγωγή των καρέ ολοκληρώθηκε
            </Typography>
        : null;


    const displayVideoDownload = encoding ?
        !videoDownload ?
            <Typography variant="h6" component="p" color="secondary" className={classes.loadingTypography}>
                <CircularIndeterminate />
                Λήψη βίνεο από το YouTube για τον υπολογισμό χρόνου προβολής των ηθοποιών
            </Typography> :
            <Typography variant="h6" component="p" color="secondary" style={{ marginTop: 8 }}>
                <CheckIcon style={{ color: 'green' }} />
                Η λήψη των video από το YouTube ολοκληρώθηκε
            </Typography>
        : null;

    const displayScreenTimes = videoFrames ?
        !screenTimes ?
            <Typography variant="h6" component="p" color="secondary" className={classes.loadingTypography}>
                <CircularIndeterminate />
                Υπολογισμός του χρόνου εμφάνισης των ηθοποιών για κάθε video με χρήση νευρωνικού δικτύου
            </Typography> :
            <Typography variant="h6" component="p" color="secondary" style={{ marginTop: 8 }}>
                <CheckIcon style={{ color: 'green' }} />
                Ο υπολογισμός του χρόνου εμφάνισης ολοκληρώθηκε
            </Typography>
        : null;

    const displayProcessCompleted = loading ?
        null :
        <React.Fragment>
            {processError ?
                <Typography variant="h5" component="p" className={classes.error} style={{ marginTop: 8 }}>
                    <ErrorOutlineIcon style={{ fontSize: 30, paddingRight: 12, paddingTop: 10 }} />
                    Εμφανίστηκε σφάλμα κατά τον υπολογισμό των χρόνων εμφάνισης ηθοποιών
                </Typography> :
                <Typography variant="h5" component="p" color="textPrimary" style={{ marginTop: 8 }}>
                    <InfoOutlinedIcon color="primary" style={{ fontSize: 35, paddingRight: 12, paddingTop: 10 }} />
                    Η διαδικασία υπολογισμού ολοκληρώθηκε με επιτυχία
                </Typography>
            }
            <Grid container justify="center">
                <Grid item xs={12} md={6} lg={4}>
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >
                        Επιστροφή
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>


    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Title>Υπολογισμός Χρόνου Εμφάνισης Ηθοποιών</Title>
                {displayDatasetCreation}
                {displayDatasetEncoding}
                {displayVideoDownload}
                {displayVideoFrames}
                {displayScreenTimes}
            </Paper>
            {displayProcessCompleted}
        </React.Fragment>
    );
}