import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Title from '../../UI/Title/Title';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MemoryIcon from '@material-ui/icons/Memory';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 27/5/21.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginBottom: theme.spacing(2)
    },
    formControl: {
        minWidth: 250,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
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
    }
}));


export default function ProcessForm({ clicked }) {
    const classes = useStyles();

    // actor screen times parameters
    const [values, setValues] = useState({
        datasetSize: '',
        datasetModel: '',
        videoProcessModel: '',
    });

    //  handle the changing values
    const handleChange = property => event => {
        setValues({ ...values, [property]: event.target.value });
    };

    return (
        <Paper className={classes.paper} style={{ height: 240 }}>
            <Title>Υπολογισμός Χρόνου Εμφάνισης Ηθοποιών</Title>
            <form className={classes.form} onSubmit={event => clicked(event, values)}>
                <Grid container spacing={2} justify="space-around" alignItems="center">
                    <Grid item xs={12} sm={4} lg={3}>
                        <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel id="select-size-label">Μέγεθος Βάσης Γνώσης</InputLabel>
                            <Select
                                labelId="select-size-label"
                                id="select-size"
                                required
                                fullWidth
                                value={values.datasetSize}
                                onChange={handleChange('datasetSize')}
                            >
                                <MenuItem value="">
                                    <em>Επιλέξτε</em>
                                </MenuItem>
                                <MenuItem value={5}>Μικρό (5 εικόνες ανά ηθοποιό)</MenuItem>
                                <MenuItem value={10}>Μεσαίο (10 εικόνες ανά ηθοποιό)</MenuItem>
                                <MenuItem value={20}>Μεγάλο (20 εικόνες ανά ηθοποιό)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel id="select-dataset-model-label">Μοντέλο Βάσης Γνώσης</InputLabel>
                            <Select
                                labelId="select-dataset-model-label"
                                id="select-dataset-model"
                                required
                                fullWidth
                                value={values.datasetModel}
                                onChange={handleChange('datasetModel')}
                            >
                                <MenuItem value="">
                                    <em>Επιλέξτε</em>
                                </MenuItem>
                                <MenuItem value={'hog'}>Γρήγορο (Αναξιόπιστο)</MenuItem>
                                <MenuItem value={'cnn'}>Αργό (Αξιόπιστο)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel id="select-video-model-label">Μοντέλο Χρόνου Προβολής</InputLabel>
                            <Select
                                labelId="select-video-model-label"
                                id="select-video-model"
                                required
                                fullWidth
                                value={values.videoProcessModel}
                                onChange={handleChange('videoProcessModel')}
                            >
                                <MenuItem value="">
                                    <em>Επιλέξτε</em>
                                </MenuItem>
                                <MenuItem value={'hog'}>Γρήγορο (Αναξιόπιστο)</MenuItem>
                                <MenuItem value={'cnn'}>Αργό (Αξιόπιστο)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            startIcon={<MemoryIcon />}
                            className={classes.submit}
                        >
                            Υπολογισμός
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}



