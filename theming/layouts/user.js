import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function User({ children, title, deauthenticate }) {
  const classes = useStyles();

  return (<div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={classes.root}>
      <Header deauthenticate={deauthenticate}/>  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {children}
        </div>
      </Container>
      <Footer />
    </div>
  </div>);
}

const mapStateToProps = (state) => (
  {isAuthenticated: !!state.authentication.token}
);

export default connect(mapStateToProps, actions)(User);