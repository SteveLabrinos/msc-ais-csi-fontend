import React from 'react';
import cx from 'clsx';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';


/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 28/5/2021.
 */

const usePersonStyles = makeStyles(() => ({
    text: {
        fontFamily: 'Barlow, san-serif',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    name: {
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
    },
    caption: {
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
    },
    btn: {
        borderRadius: 20,
        padding: '0.125rem 0.75rem',
        borderColor: '#becddc',
        fontSize: '0.75rem',
    },
}));

const useSliderStyles = makeStyles(({ palette }) => ({
    root: {
        height: 4,
    },
    rail: {
        borderRadius: 10,
        height: 4,
        backgroundColor: 'rgb(202,211,216)',
    },
    track: {
        borderRadius: 10,
        height: 4,
        backgroundColor: 'rgb(117,156,250)',
    },
    thumb: {
        display: 'none',
    },
}));


const usePercentageStyles = makeStyles(({ palette }) => ({
    percentage: {
        marginLeft: 8,
        fontSize: 14,
        color: palette.grey[500],
    },
}));


const PersonItem = ({ src, name, roleName, actorScreenTime, videoDuration }) => {
    const avatarStyles = useDynamicAvatarStyles({ size: 56 });
    const styles = usePersonStyles();
    const sliderStyles = useSliderStyles();
    const percentageStyles = usePercentageStyles();
    const marks = [
        {
            value: 0,
        },
        {
            value: videoDuration,
        },
    ];

    return (
        <Row gap={2} p={2.5}>
            <Item>
                <Avatar classes={avatarStyles} src={src} />
            </Item>
            <Row wrap grow gap={0.5} minWidth={0}>
                <Item grow minWidth={0}>
                    <div className={cx(styles.name, styles.text)}>{name}</div>
                    <div className={cx(styles.caption, styles.text)}>{roleName}</div>
                    <Box display={'flex'} alignItems={'center'}>
                        <Slider
                            classes={sliderStyles}
                            valueLabelDisplay="auto"
                            marks={marks}
                            defaultValue={actorScreenTime} />
                        <span className={percentageStyles.percentage}>
                            {`${actorScreenTime}/${videoDuration}`}
                        </span>
                    </Box>
                </Item>
                <Item position={'middle'}>
                    <Button className={styles.btn} variant={'outlined'}>
                        {`${parseInt(actorScreenTime / videoDuration * 100)}%`}
                    </Button>
                </Item>
            </Row>
        </Row>
    );
};

const useStyles = makeStyles(() => ({
    card: {
        width: '100%',
        borderRadius: 5,
        boxShadow: '0 8px 16px 0 #BDC9D7',
        overflow: 'hidden',
    },
    header: {
        fontFamily: 'Barlow, san-serif',
        backgroundColor: '#fff',
    },
    headline: {
        color: '#122740',
        fontSize: '1.25rem',
        fontWeight: 600,
    },
    link: {
        color: '#2281bb',
        padding: '0 0.25rem',
        fontSize: '0.875rem',
    },
    actions: {
        color: '#BDC9D7'
    },
    divider: {
        backgroundColor: '#d9e2ee',
        margin: '0 20px',
    },
}));


export default function ActorScreenTimes({ actors, videoDuration }) {

    const styles = useStyles();
    return (
        <>
            <Divider variant={'middle'} className={styles.divider} />
            <NoSsr>
                <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
            </NoSsr>
            <Column p={0} gap={0} className={styles.card}>
                <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
                    <Item stretched className={styles.headline}>Χρόνοι Εμφάνισης</Item>
                </Row>
                {
                    actors.map((actor, i) => (
                        <React.Fragment>
                            <PersonItem
                                name={actor.name}
                                roleName={actor.roleName}
                                src={actor.imageUrl}
                                actorScreenTime={actor.duration}
                                videoDuration={videoDuration}
                            />
                            {i < 2 ?
                                <Divider variant={'middle'} className={styles.divider} /> : null
                            }
                        </React.Fragment>
                    ))
                }
            </Column>
        </>
    );
}