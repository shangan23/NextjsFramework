import { Form } from 'react-final-form';
import { Grid, Button, Divider, Typography } from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from '@material-ui/core/styles';
import moduleController from '../../modules/controller';
import Router from 'next/router';
import RenderFields from './RenderFields';
import { validateFields } from '../../utils/helper';

const useStyles = (theme) => ({
  fieldsContainer: {
    minHeight: theme.spacing(65),
    maxHeight: theme.spacing(60),
    maxWidth: '100%',
    overflow: 'scroll'
  }, buttons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    position: 'relative',
    float: 'right'
  },
  buttonClear: {
    clear: 'both'
  },
  formTitle: {
    float: 'left',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
  },
  formTitleButtons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    position: 'relative',
    float: 'right'
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
      console.log('this.props.defaultValue', this.props.defaultValue);
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
      return validateFields(values, fieldsToRender);
    };

    const onSubmit = async values => {
      //window.alert(JSON.stringify(values, 0, 2));
      let resourceUrl, resourceMethod;

      if (this.props.action == 'new') {
        resourceUrl = `${this.props.siteDetails.siteURL}api/app/${this.props.module}`;
        resourceMethod = 'POST';
      } else if (this.props.action == 'edit') {
        resourceUrl = `${this.props.siteDetails.siteURL}api/app/${this.props.module}/${this.props.defaultValue.id}`;
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
            Router.push(
              '/app/[appId]',
              `/app/${this.props.module}`
            )
          }).catch(error => {
            this.props.notifications(error);
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
                  <RenderFields fieldsToRender={fieldsToRender} />
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