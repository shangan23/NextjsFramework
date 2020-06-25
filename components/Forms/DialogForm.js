import React from 'react';
import { Form } from 'react-final-form';
import {
  Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moduleController from '../../modules/controller';
import Router from 'next/router';
import { API } from '../../config';
import { connect } from 'react-redux';
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
import actions from '../../redux/actions';

const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: '24px',
  },
  inverseIcon: {
    transform: 'rotate(90deg)',
  },
  infoBox: {
    float: 'left',
    padding: '10px'
  },
  infoBoxIcon: {
    fontSize: '60px',
    //color:'red' // ThemeControl
  },
  dialogTitleBg: {
    backgroundColor: '#1a73e8',
    color: '#fff'
  },
  dialogActionBg: {
    backgroundColor: '#f7f7f7'
  }
};

class DialogForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: this.props.isOpen, submittedValues: undefined, modeuleObject: {} };
  }

  componentDidMount() {
    if (this.props.action == 'edit') {
      fetch(`${this.props.siteDetails.siteURL}api/app/${this.props.module}/${this.props.objectId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ modeuleObject: data });
        });
    } else {
      let defaultData = {
        fk_createdBy: this.props.user.details,
        fk_updatedBy: this.props.user.details
      }
      this.setState({ modeuleObject: defaultData });
    }

  }

  render() {

    const { classes } = this.props;

    let fieldsToRender = moduleController(this.props.module, this.props.siteDetails);

    const onSubmitForm = (values) => {
      this.setState({ submittedValues: values });
      onSubmit(values);
    };

    const onFileUpload = () => {
      //console
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

    const renderFields = (
      <Grid container spacing={2} style={{ margin: 4 }} key={`${this.props.module}-grid-dialog${Math.random()}`}>
        {fieldsToRender.map((data, index) => (
          <React.Fragment key={`${this.props.module}fragment-dialog${Math.random()}`} >
            {(fieldsToRender[index]['type'] == 'Text' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Text index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Date' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Date index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Select' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Select index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Checkbox' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Checkbox index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Time' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Time index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'TextArea' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <TextArea index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Radio' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Radio index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Autocomplete' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Autocomplete index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Email' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Email index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Password' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Password index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Switch' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Switch index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'AutocompleteSingle' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <AutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Upload' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <File index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Lookup' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <Lookup index={index} fieldsToRender={fieldsToRender} />
              </Grid>
            }
          </React.Fragment>
        ))}
      </Grid>
    );

    const onSubmit = async values => {

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
            this.props.onClose();
            //console.log(Router.pathname);
            Router.push(Router.pathname);
          }).catch(error => {
            this.props.notifications(error);
            //this.props.onClose();
            Router.push(Router.pathname);
          });
      }
    };

    const handleCancelAction = () => {
      this.props.onClose();
    };

    const dialogTitle = (this.props.action == 'new') ? `Add New ${this.props.module}` : `Edit ${this.props.module}`;
    console.log('modeuleObject', this.state.modeuleObject);

    const formDialog = (
      <Dialog
        //fullScreen
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      ><DialogTitle className={classes.dialogTitleBg} id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <Form
          onSubmit={onSubmitForm}
          initialValues={this.state.submittedValues ? this.state.submittedValues : this.state.modeuleObject}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogContent>
                <Grid container alignItems="flex-end" spacing={1}>
                  {renderFields}
                </Grid>
              </DialogContent>
              <DialogActions className={classes.dialogActionBg}>
                <Button id="cancel" onClick={handleCancelAction} color="secondary">
                  Cancel
                </Button>
                <Button id="cancel" type="submit" color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </form>)}
        />
      </Dialog>
    );

    return (
      <div className={classes.iconContainer}>
        {formDialog}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    siteDetails: state.siteSettings.settings,
    user: state.authentication.user
  }
);

export default connect(mapStateToProps, actions)(withStyles(defaultToolbarSelectStyles, { name: 'DialogForm' })(DialogForm));