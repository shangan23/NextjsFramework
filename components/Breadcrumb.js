import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

export default function Breadcrumb() {

  const useStyles = makeStyles(theme => ({
    paperBreadcrumb: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        height: theme.spacing(4),
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  }));

  const router = useRouter();
  const classes = useStyles();
  let renderBreadcrumb = router.pathname.split('/');
  return (<Paper elevation={1} style={{ padding: 5 }} className={classes.paperBreadcrumb}>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {renderBreadcrumb.map((data, index) => (
        (index == '0') &&
         <Link color="inherit" href="/dashboard"><Typography variant="overline" color="textPrimary">Dashboard</Typography></Link> ||
        (index == '1' && renderBreadcrumb[index]!='dashboard') &&
        <Link color="inherit" href="/"><Typography variant="overline" color="textPrimary">{renderBreadcrumb[index]}</Typography></Link> ||
        (index == '2') &&
        <Link color="inherit" href="/"><Typography variant="overline" color="textPrimary">{renderBreadcrumb[index]}</Typography></Link> ||
        (index == '3') &&
        <Typography variant="h6" color="textPrimary" className={classes.label}>{renderBreadcrumb[index]}</Typography>
      ))}
    </Breadcrumbs>
    <Divider variant="fullWidth" style={{ margin: 5 }} />
  </Paper>);
}