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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moduleController from '../../modules/controller';
import Router from 'next/router';
import { API } from '../../config';
import { connect } from 'react-redux';
import FieldAutocomplete from '../Fields/FieldAutocomplete';
import FieldCheckbox from '../Fields/FieldCheckbox';
import FieldDate from '../Fields/FieldDate';
import FieldRadio from '../Fields/FieldRadio';
import FieldSelect from '../Fields/FieldSelect';
import FieldText from '../Fields/FieldText';
import FieldTextArea from '../Fields/FieldTextArea';
import FieldTime from '../Fields/FieldTime';
import FieldEmail from '../Fields/FieldEmail';
import FieldPassword from '../Fields/FieldPassword';
import FieldSwitch from '../Fields/FieldSwitch';
import FieldAutoCompleteSingle from '../Fields/FieldAutocompleteSingle';
import FieldFile from '../Fields/FieldFile';
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
      fetch(`${API}/${this.props.module}/${this.props.objectId}`, {
        headers: {
          'Authorization': `Basic ${this.props.token}`
        },
      }).then((res) => res.json())
        .then((data) => {
          this.setState({ modeuleObject: data });
        });
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
      <Grid container spacing={2} style={{ margin: 4 }}>
        {fieldsToRender.map((data, index) => (
          <React.Fragment>
            {(fieldsToRender[index]['type'] == 'Text' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldText index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Date' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldDate index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Select' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldSelect index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Checkbox' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldCheckbox index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Time' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldTime index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'TextArea' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldTextArea index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Radio' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldRadio index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Autocomplete' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldAutocomplete index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Email' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldEmail index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Password' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldPassword index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Switch' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldSwitch index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'AutocompleteSingle' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldAutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
              </Grid>
              || (fieldsToRender[index]['type'] == 'Upload' && !fieldsToRender[index]['options']['display']) &&
              <Grid item xs={6} md={6} key={index}>
                <FieldFile index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
              </Grid>
            }
          </React.Fragment>
        ))}
      </Grid>
    );

    const onSubmit = async values => {

      let resourceUrl, resourceMethod;

      if (this.props.action == 'new') {
        resourceUrl = `${API}/${this.props.module}`;
        resourceMethod = 'POST';
      } else if (this.props.action == 'edit') {
        resourceUrl = `${API}/${this.props.module}/${this.props.objectId}`;
        resourceMethod = 'PUT';
      }

      if (resourceUrl && resourceMethod) {
        fetch(resourceUrl, {
          method: resourceMethod,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.props.token}`
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then(data => {
            this.props.notifications(data);
            this.props.onClose();
            Router.push(`/admin/${this.props.module}`);
          }).catch(error => {
            this.props.notifications(error);
            //this.props.onClose();
            Router.push(`/admin/${this.props.module}`);
          });
      }
    };

    const handleCancelAction = () => {
      this.props.onClose();
    };

    const dialogTitle = (this.props.action == 'new') ? `Add New ${this.props.module}` : `Edit ${this.props.module}`;

    const formDialog = (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Form
          onSubmit={onSubmitForm} style={{ marginTop: 16 }}
          initialValues={this.state.submittedValues ? this.state.submittedValues : this.state.modeuleObject}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogTitle className={classes.dialogTitleBg} id="alert-dialog-title">{dialogTitle}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container alignItems="flex-end" spacing={1}>
                    {renderFields}
                    <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="flex-end"
                      item style={{ marginTop: 16 }}>
                    </Grid>
                  </Grid>
                </DialogContentText>
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
    token: state.authentication.user.token
  }
);

export default connect(mapStateToProps, actions)(withStyles(defaultToolbarSelectStyles, { name: 'DialogForm' })(DialogForm));