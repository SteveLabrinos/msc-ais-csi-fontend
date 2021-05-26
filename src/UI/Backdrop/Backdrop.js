import classes from './Backdrop.module.css';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.
 */


export default function CustomBackdrop({ clicked, show }) {
    return (
        show ? <div className={classes.Backdrop} onClick={clicked}></div> : null
    );
}
