import { localDeployment } from '../App';
import TvIcon from '@material-ui/icons/Tv';
import TheatersRoundedIcon from '@material-ui/icons/TheatersRounded';
import MovieCreationTwoToneIcon from '@material-ui/icons/MovieCreationTwoTone';

export const baseURL = localDeployment ?
    'http://localhost:5000/api/' :
    'https://csi.msc-ais.site/api/';

export const getFirstLetters = string => {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join(' ');
};

export const mapModel = model => {
    switch (model) {
        case 'hog': return 'Γρήγορο (αναξιόπιστο)';
        case 'cnn': return 'Πολύ αργό (αξιόπιστο)';
        default: return '--Επιλέξτε--';
    }
};

export const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

export const mapIconsToMovieType = movieType => {
    switch (movieType) {
        case 'movie': return <TheatersRoundedIcon fontSize="large" />;
        case 'series': return <TvIcon fontSize="large" />;
        default: return <MovieCreationTwoToneIcon fontSize="large" />;
    }
};

export const thousandsSeparator = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
