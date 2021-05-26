import Typography from '@material-ui/core/Typography';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 26/5/21.
 */

const style = { fontSize: '.8rem' }

const Copyright = () => (
    <Typography variant="body2" color="inherit" style={style}>
        {`Copyright © Computer Software International ${new Date().getFullYear()}`}
    </Typography>
);

export default Copyright;
