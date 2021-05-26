import { Fragment } from 'react';

import Logo from '../../../UI/Logo/Logo';
import ScrollTop from '../ScrollTop/ScrollTop';
import { Hidden, makeStyles, AppBar, CssBaseline, Fab } from '@material-ui/core';
import { Toolbar, Typography, Grid } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.
 */

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        color: 'white'
    },
    img: {
        height: 80,
        textAlign: 'center',
        flex: 2
    },
    logoStyle: {
        display: 'flex'
    },
    navigationItems: {
        flex: 1,
    },
    logInBtnContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    navigationToolbar: {
        minHeight: '50px'
    }
}));

export default function Navbar(props) {
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar} >
                    <CssBaseline />
                     <Grid container spacing={2} justify="space-between" alignItems="center">
                        <Hidden smDown>
                            <Grid item md={6}>
                                <Typography variant="h5" component="h2" className={classes.title}>
                                    Software Computer International
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={6} className={classes.logoStyle}>
                            <Typography component="div" className={classes.img}>
                                <Logo logoType="appLogo" />
                            </Typography>
                        </Grid>
                     </Grid>
                </Toolbar>
            </AppBar>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Fragment>
    );
}