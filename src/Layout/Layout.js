import React, { Fragment, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core';

import Navbar from '../components/Navigation/Navbar/Navbar';
import Modal from '../UI/Modal/Modal';
import PrivacyPolicy from '../components/Navigation/Footer/FooterContent/PrivacyPolicy';
import Footer from '../components/Navigation/Footer/Footer'
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.
 */

const useStyles = makeStyles(theme => ({
    mainStyled: {
        [theme.breakpoints.up("md")]: {
            marginTop: '1rem',
        }
    }
}));

const Layout = props => {
    const classes = useStyles();

    const [privacyVisible, setPrivacyVisible] = useState(false);

    const handlePrivacyClose = () => {
        setPrivacyVisible(false);
    };

    const handlePrivacyOpen = () => {
        setPrivacyVisible(true);
    };

    return (
        <Fragment>
            <Modal show={privacyVisible} closeModal={handlePrivacyClose}>
                <PrivacyPolicy />
            </Modal>
            <Navbar />
            <main className={classes.mainStyled}>
                <Container maxWidth="lg">
                    {props.children}
                </Container>
            </main>
            <Footer showPrivacy={handlePrivacyOpen} />
        </Fragment>
    );
};

export default memo(Layout);