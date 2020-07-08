import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        zIndex: 2000,
        position:'fixed',
        '& > * + *': {
            //marginTop: theme.spacing(13),
        },
    },
}));

export default function PageLoader() {
    const classes = useStyles();
    //const DONE_DURATION = 250
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => { });
    
    const onLoad = () => {
        progressRef.current = () => {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
        };
    };
    const onDone = () => {
        progressRef.current = () => {
            setProgress(100);
            setBuffer(10);
        }
    };

    React.useEffect(() => {
        Router.events.on('routeChangeStart', onLoad)
        Router.events.on('routeChangeComplete', onDone)
        Router.events.on('routeChangeError', onDone)

        return () => {
            Router.events.off('routeChangeStart', onLoad)
            Router.events.off('routeChangeComplete', onDone)
            Router.events.off('routeChangeError', onDone)
        }
    })

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgress color="secondary" variant="buffer" value={progress} valueBuffer={buffer} />
        </div>
    );
}
