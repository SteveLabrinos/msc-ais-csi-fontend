import React from 'react';
import { useSelector } from 'react-redux';
import { dashboardSelector } from './dashboardSlice';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import YouTubeIcon from '@material-ui/icons/YouTube';
import imgNotFound from '../../assets/images/image-not-found.png';
import { mapIconsToMovieType } from '../../shared/utility';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 450,
        backgroundSize: 'contain',
        // backgroundPositionX: 'left'
    },
    movieTypeContainer: {
        textAlign: 'end'
    },
    actorMedia: {
        height: 140,
        maxWidth: 100
    },
    actorPaper: {
        width: '100%',
        marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down("md")]: {
        actorPaper: {
            margin: theme.spacing(1)
        },
    },
}));


/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 26/5/2021.
 */

export default function MovieCard({ videoRequest }) {
    const classes = useStyles();
    const { movie } = useSelector(dashboardSelector);

    return (
        <Card>
            <CardActionArea href={`https://www.imdb.com/title/${movie.id}`} target="_blank"
                            rel="noreferrer">
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} md={4}>
                        <CardMedia
                            // component="img"
                            className={classes.media}
                            media="img"
                            image={movie.imageUrl ? movie.imageUrl : imgNotFound}
                            title={movie.title}
                        />
                    </Grid>
                    <Grid  container item xs={12} md={8} alignItems="center">
                        {movie.actors.map(actor => (
                            <Paper key={actor.id} className={classes.actorPaper}>
                                <Grid container justify="center" spacing={1}>
                                    <Grid item xs={3}>
                                        <CardMedia
                                            className={classes.actorMedia}
                                            media="img"
                                            image={actor.imageUrl ? actor.imageUrl : imgNotFound}
                                            title={actor.name}
                                        />
                                    </Grid>
                                    <Grid container item xs={9} alignItems="center" >
                                        <Grid item xs={12}>
                                            <Typography variant="h6" component="h6" color="textPrimary">
                                                {actor.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" component="h6" color="textSecondary">
                                                {actor.roleName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}

                    </Grid>
                </Grid>
                <CardContent>
                    <Grid container justify="space-between" spacing={3}>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h4" component="h2">
                                {movie.title} <span style={{fontSize: '.6em', color: '#808080'}}>({movie.year})</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.movieTypeContainer}>
                            <Typography gutterBottom variant="h4" component="h2">
                                {mapIconsToMovieType(movie.type)}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={videoRequest}
                    startIcon={<YouTubeIcon />}>
                    YOU TUBE VIDEOS
                </Button>
            </CardActions>
        </Card>
    );
}