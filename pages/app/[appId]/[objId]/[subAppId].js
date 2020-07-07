import React from 'react';
import initialize from '../../../../utils/initialize';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";
import { Grid } from '@material-ui/core';
import { getCookie } from '../../../../utils/cookie';
import moduleController from '../../../../modules/controller';
import modules from '../../../../modules/index';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Router from 'next/router';
import RespTable from '../../../../components/SubAppTable';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBox';
import DialogForm from '../../../../components/Forms/DialogForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import actions from '../../../../redux/actions';

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    top: theme.spacing(0),
    position: 'relative'
  },
  toolbarStyle: {
    minHeight: theme.spacing(1),
    marginLeft: theme.spacing(-2)
  },
  paperDetails: {
    padding: theme.spacing(1),
    minHeight: theme.spacing(63.5),
    overflow: 'scroll',
  },
  Section: {
    backgroundColor: '#FAFAFC',
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  grow: {
    flexGrow: 1,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    padding: 0
  },
  buttons: {
    margin: theme.spacing(1),
    float: 'right'
  },
  wrapIcon: {
    verticalAlign: 'bottom',
    display: 'inline-flex'
  },
});

const frameURL = async (req) => {
  let user, host, cleanUser, urlObj, headers = {};
  user = getCookie('user', req);
  cleanUser = unescape(user);
  cleanUser = JSON.parse(cleanUser);
  headers['Authorization'] = `Basic ${cleanUser.token}`;
  headers['Content-Type'] = 'application/json';
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let module, object, subApp, modulePath, queryParam, data, listing;
  let { origin, pathname, searchParams } = urlObj;
  modulePath = pathname.replace('/app/', '');
  modulePath = modulePath.split('/');
  module = modulePath[0];
  object = modulePath[1];
  subApp = modulePath[2];
  console.log('iServer module', module);
  console.log('iServer object', object);
  console.log('iServer subApp', subApp);
  let moduleMeta = await modules(module);
  let subAppParentId = await moduleMeta.parentFieldId;
  console.log('iServer subAppParentId', subAppParentId);
  //searchParams.set(filter, JSON.stringify([{ k: subAppParentId, o: 'is', v: object, l: 'AND' }]));
  queryParam = '?'
  queryParam += (searchParams.get('limit')) ? `limit=${searchParams.get('limit')}` : '';
  queryParam += (searchParams.get('page')) ? `&page=${searchParams.get('page')}` : '';
  queryParam += (searchParams.get('filter')) ? `&filter=${searchParams.get('filter')}` : '';
  console.log('iServer filter', `${origin}/api/app/${module}/${object}/${subApp}${queryParam}`);
  data = await fetch(`${origin}/api/app/${module}/${object}/${subApp}${queryParam}`, { headers: headers });
  listing = await data.json();

  const objData = await fetch(`${origin}/api/app/${module}/${object}`);
  const objJson = await objData.json();


  let steps = [], subApps = [];

  subApps = await moduleMeta.subApp;

  if (subApps) {
    await steps.push({ label: `${module.charAt(0).toUpperCase() + module.slice(1)} Detail`, id: module });
    await subApps.map(obj => steps.push({ label: obj.lable.plural, id: obj.id, singular: obj.lable.singular }));
  }

  let stepperIndex = await steps.findIndex(p => p.id == subApp);
  console.log('iServer stepperIndex', stepperIndex);
  return { listing, module, objJson, subApp, steps, stepperIndex }
};

class DynamicCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0, showDailog: false, dailogAction: null, subAppObjId: 0, showConfirmDialog: false };
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      const fullUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
      let module = ctx.query.appId;
      let object = ctx.query.objId;
      let subApp = ctx.query.subAppId;
      let moduleMeta = await modules(module);
      console.log('iClient subApp', subApp);

      const objData = await fetch(`${fullUrl}/api/app/${module}/${object}`);
      const objJson = await objData.json();

      let { query } = ctx;
      let subAppParentId = await moduleMeta.parentFieldId;
      console.log('iServer moduleMeta', moduleMeta);
      console.log('iClient subAppParentId', subAppParentId);
      //query.filter = await { k: subAppParentId, o: 'is', v: object, lo: 'AND' };
      let queryParam = '?'
      queryParam += (query.limit) ? `limit=${query.limit}` : '';
      queryParam += (query.page) ? `&page=${query.page}` : '';
      queryParam += (query.filter) ? `&filter=${JSON.stringify([query.filter])}` : '';

      console.log('iClient filter', `${fullUrl}/api/app/${module}/${object}/${subApp}${queryParam}`);
      const data = await fetch(`${fullUrl}/api/app/${module}/${object}/${subApp}${queryParam}`);
      const json = await data.json();

      let steps = [], subApps = [];
      subApps = await moduleMeta.subApp;
      if (subApps) {
        await steps.push({ label: `${module.charAt(0).toUpperCase() + module.slice(1)} Detail`, id: module });
        await subApps.map(obj => steps.push({ label: obj.lable.plural, id: obj.id, singular: obj.lable.singular }));
      }
      let stepperIndex = await steps.findIndex(p => p.id == subApp);
      console.log('iClient stepperIndex', stepperIndex);
      return { listing: json, module: module, objJson: objJson, subApp: subApp, steps: steps, stepperIndex: stepperIndex };
    } else {
      const { listing, module, objJson, subApp, steps, stepperIndex } = await frameURL(req);
      return { listing, module, objJson, subApp, steps, stepperIndex };
    }
  }

  componentDidMount() {
    console.log('----componentDidMount', this.props.stepperIndex);
    this.setState({ activeStep: this.props.stepperIndex });
  }

  render() {

    let module = this.props.module;
    let steps = this.props.steps;

    const { classes } = this.props;

    let fieldsToRender = moduleController(this.props.subApp, this.props.siteInfo);
    let moduleFieldsToRender = moduleController(this.props.module, this.props.siteInfo);
    let object = this.props.objJson;

    console.log(object);
    let objTitle, objCreatedBy;
    moduleFieldsToRender.filter(function (obj) {
      if (obj.primary) {
        objTitle = object[obj.id];
      }
      if (obj.fk && obj.id === 'fk_createdBy') {
        objCreatedBy = object['fk_createdBy'].fullName;
      }
    });

    const handleStep = (step) => () => {
      if (step == 0) {
        Router.push(
          '/app/[appId]/[objId]',
          `/app/${module}/${object.id}`
        );
      } else {
        Router.push(
          '/app/[appId]/[objId]/[subAppId]',
          `/app/${module}/${object.id}/subItems`
        );
      }
    };

    const onAddOpen = () => {
      this.setState({ showDailog: true, dailogAction: 'new' });
    };

    const onDailogClose = () => {
      this.setState({ showDailog: false });
    };

    const onRowAction = (action, id) => {
      if (action == 'edit')
        this.setState({ showDailog: true, dailogAction: action, subAppObjId: id });
      else if (action == 'delete')
        this.setState({ showConfirmDialog: true, subAppObjId: id })
    };

    const handleCancelActionSubApp = () => {
      this.setState({ showConfirmDialog: false });
    };

    const handleConfirmActionSubApp = () => {
      fetch(`${this.props.siteInfo.siteURL}api/app/${Router.router.query.appId}/${Router.router.query.objId}/${Router.router.query.subAppId}/${this.state.subAppObjId}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          this.setState({ showConfirmDialog: false });
          this.props.notifications(data);
          Router.push(
            '/app/[appId]/[objId]/[subAppId]',
            `/app/${Router.router.query.appId}/${Router.router.query.objId}/${Router.router.query.subAppId}`
          );
        });
    };

    //console.log('steps[this.state.activeStep].singular', steps[this.state.activeStep].singular, steps[this.state.activeStep])

    const stepRender = (<div className={classes.root}>
      <div>
        <div>
          <RespTable
            onRowAction={onRowAction}
            module={module}
            createLink={'tests'}
            list={this.props.listing}
            columns={fieldsToRender} />
        </div>
      </div>
    </div>);

    const dailogForm = (<DialogForm
      title={steps[this.state.activeStep].singular}
      module={this.props.subApp}
      action={this.state.dailogAction}
      onClose={onDailogClose}
      subAppObjId={this.state.subAppObjId}
      isOpen={this.state.showDailog} />);

    const confirmDeleteDialog = (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.showConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="primary">{'Are you sure you want to delete?'}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              Confirming this action will delete the record permanently.
                <Typography color="secondary" variant="body2" className={classes.wrapIcon}>
                Warning: This action cannot be undone!
                  </Typography>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleCancelActionSubApp} color="secondary">
            Cancel
        </Button>
          <Button id="cancel" onClick={handleConfirmActionSubApp} color="primary" autoFocus>
            Confirm
        </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <Grid container spacing={0} key={`${Math.random()}`}>
        <Grid item xs={12} md={12}>
          <AppBar elevation={0} position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar className={classes.toolbarStyle} variant="dense">
              <div>
                <Typography variant="h6">{objTitle}</Typography>
                <Typography variant="caption">
                  Created on <Moment format={this.props.siteInfo.dateFormat}>{object.createdAt}</Moment> | Created By {objCreatedBy}
                </Typography>
              </div>
              <div className={classes.grow}>
              </div>
              <Stepper className={classes.stepper} nonLinear activeStep={this.state.activeStep}>
                {steps.map((label, index) => (
                  <Step key={Math.random()}>
                    <StepButton onClick={handleStep(index)}>
                      {label.label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Toolbar>
          </AppBar>
          <Paper elevation={0} variant="outlined" className={classes.paperDetails}>
            {dailogForm}
            {confirmDeleteDialog}
            <Container maxWidth="xl">
              <Chip
                size="small"
                color="secondary"
                icon={<AddBoxOutlinedIcon />}
                label="Create"
                onClick={onAddOpen}
                className={classes.buttons}
              />
            </Container>
            {stepRender}
          </Paper>
        </Grid>
      </Grid >
    );
  }

}

function mapStateToProps(state) {
  return {
    siteInfo: state.siteSettings.settings,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withStyles(useStyles)(DynamicCreate));
