import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 26/5/2021.
 */

export default function SearchForm(props) {
    const { submit, classes, input, query } = props;

    return (
        <form onSubmit={submit} className={classes.searchForm}>
            <Grid container justify="center" spacing={3} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        onChange={evt => input(evt.target.value)}
                        required
                        label="Ταινία"
                        placeholder="Εισάγετε Όνομα Ταινίας"
                        fullWidth
                        // inputProps={{ pattern: '[a-zA-Z ]{1,15}' }}
                        value={query}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="submit"
                        fullWidth
                        startIcon={<SearchIcon />}>
                        ΑΝΑΖΗΤΗΣΗ
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
