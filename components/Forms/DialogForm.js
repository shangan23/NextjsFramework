import React from 'react';
import { Form } from 'react-final-form';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { validateFields } from '../../utils/helper';
import DialogTitle from '@material-ui/core/DialogTitle';
import moduleController from '../../modules/controller';
import Router from 'next/router';
import RenderFields from './RenderFields';
import { connect } from 'react-redux';
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
      return validateFields(values, fieldsToRender);
    };

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
                  <RenderFields fieldsToRender={fieldsToRender} />
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