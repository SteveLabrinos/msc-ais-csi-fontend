import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { thousandsSeparator } from '../../shared/utility';
import '../../assets/images/image-not-found.png';


/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 27/5/2021.
 */


const useStyles = makeStyles(({ palette }) => ({
    card: {
        borderRadius: 5,
        minWidth: 256,
        textAlign: 'center',
        minHeight: 331
    },
    avatar: {
        width: 80,
        height: 80,
        margin: 'auto',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginTop: 8,
        marginBottom: 0,
    },
    subheader: {
        fontSize: 14,
        color: palette.grey[500],
        marginBottom: '0.875em',
    },
    statLabel: {
        fontSize: 12,
        color: palette.grey[500],
        fontWeight: 500,
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, ' +
            'Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: '1px',
    },
    container: {
        // marginTop: 16,
        marginBottom: 16
    }
}));

export const Videos = React.memo(function VideoCard({ videoList }) {
    const classes = useStyles();
    const shadowStyles = useFadedShadowStyles();
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    });


    return (
        <Grid container spacing={2} alignItems="center" className={classes.container}>
            {videoList.map(video => (
                <Grid item xs={12} md={6} key={video.id}>
                    <Card className={cx(classes.card, shadowStyles.root)}>
                        <CardActionArea href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank"
                                        rel="noreferrer">
                            <CardContent style={{ minHeight: 201 }}>
                                <Avatar
                                    className={classes.avatar}
                                    src={video.imageUrl ? video.imageUrl :
                                        '../../assets/images/image-not-found.png'} />
                                <Typography variant="h6" component="h4">
                                    {video.title}
                                </Typography>
                                <span className={classes.subheader}>
                                    {`${thousandsSeparator(video.viewCount)} προβολές`}
                                </span>
                            </CardContent>
                        </CardActionArea>
                        <Divider light />
                        <Box display={'flex'}>
                            <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                                <p className={classes.statLabel}><ThumbUpIcon /></p>
                                <p className={classes.statValue}>{video.likeCount}</p>
                            </Box>
                            <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                                <p className={classes.statLabel}><ThumbDownAltIcon /></p>
                                <p className={classes.statValue}>{video.dislikeCount}</p>
                            </Box>
                            <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                                <p className={classes.statLabel}><CommentIcon /></p>
                                <p className={classes.statValue}>{video.commentCount}</p>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
});

export default Videos;