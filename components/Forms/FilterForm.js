import { Form } from 'react-final-form';
import {
  Grid, Button, Divider, Typography
} from '@material-ui/core';
import React from 'react';
import Autocomplete from '../Fields/Autocomplete';
import Checkbox from '../Fields/Checkbox';
import Date from '../Fields/Date';
import Radio from '../Fields/Radio';
import Select from '../Fields/Select';
import Text from '../Fields/Text';
import TextArea from '../Fields/TextArea';
import Time from '../Fields/Time';
import Email from '../Fields/Email';
import Password from '../Fields/Password';
import Switch from '../Fields/Switch';
import AutoCompleteSingle from '../Fields/AutocompleteSingle';
import File from '../Fields/File';
import Lookup from '../Fields/Lookup';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from '@material-ui/core/styles';
import moduleController from '../../modules/controller';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 300;
const useStyles = (theme) => ({
  appBar: {
    top: theme.spacing(8.25),
    bottom:'auto',
    position:'fixed',
    zIndex: theme.zIndex.snackbar + 1200,
    height: theme.spacing(4.8),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - calc(100% - ${drawerWidth}px))`,
    },
  },
  appBarBottom: {
    top: 'auto',
    bottom: 0,
    height: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - calc(100% - ${drawerWidth}px))`,
    },
  },
  grow: {
    flexGrow: 1,
  },
  pageTitle: {
    marginLeft:theme.spacing(1),
   // top: theme.spacing(0.4)
  },
  paper: {
    overflow: 'scroll',
    fontSize: '0.8rem',
  },
  fieldsContainer: {
    top: theme.spacing(30),
    height: theme.spacing(77),
    minHeight: theme.spacing(77),
  }, 
  buttons: {
    '& > *': {
      margin: theme.spacing(0.1),
    },
    top: 'auto',
    bottom: 0,
    float: 'right'
  },
  formTitleButtons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    float: 'right'
  },
  fields: {
    margin: theme.spacing(1),
  },
  toolbarStyle: {
    minHeight: theme.spacing(1)
  },
});

class FilterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: this.props.isOpen, submittedValues: undefined, modeuleObject: {} };
  }

  async componentDidMount() {
    const { query } = Router;
    if (query.filter) {

      let filters = JSON.parse(query.filter);
      let obj = {};

      await filters.map((data, index) => {
        obj[data.k] = data.v;
      });

      if (obj.fk_createdBy) {
        let dataFetch = await fetch(`${this.props.siteDetails.siteURL}api/app/users/${obj.fk_createdBy}`, { method: 'GET' })
        let dataJson = await dataFetch.json();
        obj.fk_createdBy = dataJson;
      } else if (obj.fk_updatedBy) {
        let dataFetch = await fetch(`${this.props.siteDetails.siteURL}api/app/users/${obj.fk_updatedBy}`, { method: 'GET' })
        let dataJson = await dataFetch.json();
        obj.fk_updatedBy = dataJson;
      }

      this.setState({ modeuleObject: obj });
    }
  }

  render() {
    const { classes } = this.props;

    let fieldsToRender = moduleController(this.props.module, this.props.siteDetails);

    const onSubmitForm = (values) => {
      this.setState({ submittedValues: values });
      onSubmit(values);
    };

    const renderFields = (
      <Grid container spacing={1} className={classes.fields} key={`grid-form${Math.random()}`}>
        {fieldsToRender.map((data, index) => (
          <React.Fragment key={`layout-frag${Math.random()}`}>
            {(fieldsToRender[index]['type'] == 'Text' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Text index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Date' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Date index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Select' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Select index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Checkbox' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Checkbox index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Time' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Time index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'TextArea' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <TextArea index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Radio' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Radio index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Autocomplete' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Autocomplete index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Email' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Email index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Password' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Password index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Switch' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Switch index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'AutocompleteSingle' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <AutoCompleteSingle index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Upload') &&
              <Grid item xs={12} md={12} key={index}>
                <File index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Lookup' && !!fieldsToRender[index]['options']['filter']) &&
              <Grid item xs={12} md={12} key={index}>
                <Lookup index={index} fieldsToRender={fieldsToRender} source="filter" />
              </Grid>
            }
          </React.Fragment>
        ))}
      </Grid>
    );

    const onSubmit = async values => {
      let filterURL, filterArray = [];
      Object.entries(values).map(([key, value]) => {
        if (key.indexOf('fk') === 0)
          value = value.id
        filterArray.push({ k: key, o: 'is', v: value, lo: 'AND' });
      });
      filterURL = `?filter=${JSON.stringify(filterArray)}`
      Router.push(
        `/app/[appId]${filterURL}`,
        `/app/${this.props.module}${filterURL}`,
      );
      this.props.onCancel();
    };

    const onClear = () => {
      this.setState({ modeuleObject: {} });
      Router.push(
        `/app/[appId]`,
        `/app/${this.props.module}`,
      );
      this.props.onCancel();
    }

    return (
      <Paper elevation={0} className={classes.paper}>
        <Form
          onSubmit={onSubmitForm} style={{ marginTop: 16 }}
          initialValues={this.state.submittedValues ? this.state.submittedValues : this.state.modeuleObject}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <AppBar variant="outlined" elevation={1} position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar disableGutters className={classes.toolbarStyle} variant="dense">
                  <div className={classes.pageTitle}>
                    <Typography color="primary" variant="button">Filters</Typography>
                  </div>
                  <div className={classes.grow}>
                  </div>
                  <div className={classes.pageActions}>
                    <div className={classes.formTitleButtons}>
                      <Button size="small" type="button" onClick={onClear} disableElevation>{this.props.buttonCancelText}</Button>
                      <Button size="small" type="submit" disabled={submitting} variant="contained" color="secondary" disableElevation>{this.props.buttonSubmitText}</Button>
                    </div>
                  </div>
                </Toolbar>
              </AppBar>
              <div className={classes.fieldsContainer}>
                <div className={classes.drawerHeight}><br/><br/></div>
                <Grid container alignItems="flex-end" elevation={0} spacing={1}>
                  {renderFields}
                </Grid>
              </div>
              <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBarBottom}>
                <Toolbar disableGutters className={classes.toolbarStyle} variant="dense">
                  <div className={classes.pageTitle}>
                    <Typography color="primary" variant="button">Filters</Typography>
                  </div>
                  <div className={classes.grow}>
                  </div>
                  <div className={classes.pageActions}>
                    <div className={classes.formTitleButtons}>
                      <Button size="small" type="button" onClick={onClear} disableElevation>{this.props.buttonCancelText}</Button>
                      <Button size="small" type="submit" disabled={submitting} variant="contained" color="secondary" disableElevation>{this.props.buttonSubmitText}</Button>
                    </div>
                  </div>
                </Toolbar>
              </AppBar>
            </form>
          )}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => (
  {
    siteDetails: state.siteSettings.settings,
    user: state.authentication.user
  }
);

export default connect(mapStateToProps, actions)(withStyles(useStyles, { name: 'FilterForm' })(FilterForm));