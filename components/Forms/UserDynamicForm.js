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

import { dynamicSort } from '../../utils/helper';

const useStyles = (theme) => ({
  fieldsContainer: {
    minHeight: theme.spacing(60),
    maxHeight: theme.spacing(60),
    overflow: 'scroll'
    //height: theme.spacing(60)
  }, buttons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    position: 'relative',
    float: 'right'
    //left: theme.spacing(138),
    //top: theme.spacing(0.1),
  },
  buttonClear: {
    clear: 'both'
  },
  formTitle: {
    float: 'left',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    //width: theme.spacing(138)
  },
  formTitleButtons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    position: 'relative',
    float: 'right'
    // left: theme.spacing(126.5),
  },
  fields: {
    margin: theme.spacing(1),
  }
});


class DynamicForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: this.props.isOpen, submittedValues: undefined, modeuleObject: {} };
  }

  componentDidMount() {
    let defaultData = {
      fk_createdBy: this.props.user.details,
      fk_updatedBy: this.props.user.details
    }
    this.setState({ modeuleObject: defaultData });

    if (this.props.action === 'edit') {
      console.log('this.props.defaultValue',this.props.defaultValue);
      this.setState({ modeuleObject: this.props.defaultValue });
    }
  }

  render() {
    const { classes } = this.props;

    let fieldsToRender = moduleController(this.props.module, this.props.siteDetails);

    const onSubmitForm = (values) => {
      this.setState({ submittedValues: values });
      onSubmit(values);
    };


    const validate = values => {
      const errors = {};
      var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      fieldsToRender.map((data, index) => {
        if (fieldsToRender[index]['type']) {
          let name = (fieldsToRender[index]['name']).toString();
          let label = (fieldsToRender[index]['label']).toString();
          let type = (fieldsToRender[index]['type']).toString();
          let required = (fieldsToRender[index]['required']);
          switch (type) {
            case 'Autocomplete':
              if ((values[name].length == 0) && required)
                errors[name] = label + ' required';
              break;
            case 'Email':
              if ((!values[name]) && required)
                errors[name] = label + ' required';
              else {
                if (!regex.test(values[name]) && values[name])
                  errors[name] = label + ' invalid';
              }
              break;
            default:
              if (!values[name] && required)
                errors[name] = label + ' required';
              break;
          }
        }
      }
      );
      return errors;
    };

    fieldsToRender.sort(dynamicSort('section'));

    //&& fieldsToRender[index]['options']['display']== null
    const renderFields = (
      <Grid container spacing={2} className={classes.fields} key={`grid-form${Math.random()}`}>
        {
          fieldsToRender.map((data, index) => (
            <React.Fragment key={`layout-frag${Math.random()}`}>
              {
                (
                  (index === 0) ?
                    <Grid item xs={12} md={12}>
                      <Typography color="primary" variant="overline">{fieldsToRender[index]['section']}</Typography>
                    </Grid> :
                    (fieldsToRender[index]['section'] != fieldsToRender[(index - 1)]['section']) ?
                      <React.Fragment key={`layout-frag${Math.random()}`}>
                        <Grid item xs={12} md={12}>
                          <Typography color="primary" variant="overline">{fieldsToRender[index]['section']}</Typography>
                        </Grid>
                      </React.Fragment> :
                      ''
                )
              }
              {
                (
                  (fieldsToRender[index]['type'] == 'Text') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Text index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Date') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Date index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Select') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Select index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Checkbox') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Checkbox index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Time') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Time index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'TextArea') &&
                  <Grid item xs={12} md={12} key={index}>
                    <TextArea index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Radio') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Radio index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Autocomplete') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Autocomplete index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Email') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Email index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Password') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Password index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Switch') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Switch index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'AutocompleteSingle') &&
                  <Grid item xs={12} md={4} key={index}>
                    <AutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Upload') &&
                  <Grid item xs={12} md={4} key={index}>
                    <File index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Lookup') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Lookup index={index} fieldsToRender={fieldsToRender} />
                  </Grid>
                )
              }
            </React.Fragment>
          ))
        }
      </Grid>
    );

    const onSubmit = async values => {
      //window.alert(JSON.stringify(values, 0, 2));
      let resourceUrl, resourceMethod;

      if (this.props.action == 'new') {
        resourceUrl = `${this.props.siteDetails.siteURL}api/app/${this.props.module}`;
        resourceMethod = 'POST';
      } else if (this.props.action == 'edit') {
        resourceUrl = `${this.props.siteDetails.siteURL}api/app/${this.props.module}/${this.props.objectId}`;
        resourceMethod = 'PUT';
      }

      if (resourceUrl && resourceMethod) {
        fetch(resourceUrl, {
          method: resourceMethod,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.props.user.token}`
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then(data => {
            this.props.notifications(data);
            //this.props.onClose();
            //console.log(Router.pathname);
            //Router.push(Router.asPath);
            Router.push(
              '/app/[appId]',
              `/app/${this.props.module}`
            )
          }).catch(error => {
            this.props.notifications(error);
            //this.props.onClose();
            //Router.push(Router.asPath);
            Router.push(
              '/app/[appId]',
              `/app/${this.props.module}`
            )
          });
      }
    };

    return (
      <Paper elevation={0} variant="outlined">
        <Form
          onSubmit={onSubmitForm} style={{ marginTop: 16 }}
          initialValues={this.state.submittedValues ? this.state.submittedValues : this.state.modeuleObject}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <div>
                <div className={(this.props.formTitle) ? classes.formTitle : ''}>
                  <Typography variant="button">{this.props.formTitle}</Typography>
                </div>
                <div className={(this.props.formTitle) ? classes.formTitleButtons : classes.buttons}>
                  <Button size="small" type="button" onClick={reset} disabled={submitting || pristine} disableElevation>{this.props.buttonCancelText}</Button>
                  <Button size="small" type="submit" disabled={submitting} variant="contained" color="secondary" disableElevation>{this.props.buttonSubmitText}</Button>
                </div>
                <div className={classes.buttonClear}></div>
              </div>
              <Divider />
              <div className={classes.fieldsContainer}>
                <Grid container alignItems="flex-end" spacing={1}>
                  {renderFields}
                </Grid>
              </div>
              <Divider />
              <div className={classes.buttons}>
                <Button size="small" type="button" onClick={reset} disabled={submitting || pristine} disableElevation>{this.props.buttonCancelText}</Button>
                <Button size="small" type="submit" disabled={submitting} variant="contained" color="secondary" disableElevation>{this.props.buttonSubmitText}</Button>
              </div>
              <div className={classes.buttonClear}></div>
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

export default connect(mapStateToProps, actions)(withStyles(useStyles, { name: 'DynamicForm' })(DynamicForm));