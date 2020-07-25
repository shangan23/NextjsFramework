import React from 'react';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";
import Moment from 'react-moment';
import Router from 'next/router';

import { dynamicSort } from '../../../utils/helper';
import { getCookie } from '../../../utils/cookie';
import initialize from '../../../utils/initialize';
import moduleController from '../../../modules/controller';
import modules from '../../../modules/menu';
import DynamicSetTable from '../../../components/DynamicSetTable';
import TooltipWindow from '../../../components/TooltipWindow';

import {
  Grid,
  Paper,
  Typography, withStyles, Toolbar, Stepper, Step, StepButton, Chip, AppBar, Tooltip
} from '@material-ui/core';

import {
  AccountCircle,
  RecentActors,
  Contacts, Apps, Assignment, PlaylistAddCheck, ShoppingCart, Build
} from '@material-ui/icons';

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
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
  TableCell: {
    fontSize: '0.82rem',
    padding: theme.spacing(1.8)
  },
  TableCellHead: {
    fontSize: '0.85rem',
    color: theme.palette.primary.light,
    fontWeight: 400,
    padding: theme.spacing(1)
  },
  chipIconBg: {
    color: theme.palette.primary.main
  }
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    //backgroundColor: '#f5f5f9',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.light,
    maxWidth: 420,
    //maxHeight: 220,
    overflow:'scroll',
    fontSize: theme.typography.pxToRem(20),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const frameURL = async (req) => {
  let user, host, cleanUser, urlObj, headers = {};
  user = getCookie('user', req);
  cleanUser = unescape(user);
  cleanUser = JSON.parse(cleanUser);
  headers['Authorization'] = `Basic ${cleanUser.token}`;
  headers['Content-Type'] = 'application/json';
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let module, object, modulePath;
  let { origin, pathname } = urlObj;
  modulePath = pathname.replace('/app/', '');
  modulePath = modulePath.split('/');
  module = modulePath[0];
  object = modulePath[1];
  console.log('iServer module', module);
  console.log('iServer object', object);
  const objData = await fetch(`${origin}/api/app/${module}/${object}`);
  const objJson = await objData.json();
  return { module, objJson }
};

class DynamicCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0, anchorEl: null, currentPopModule: null };
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      const fullUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
      let module = ctx.query.appId;
      let object = ctx.query.objId;
      const objData = await fetch(`${fullUrl}/api/app/${module}/${object}`);
      const objJson = await objData.json();
      return { module: module, objJson: objJson };
    } else {
      const { module, objJson } = await frameURL(req);
      return { module, objJson };
    }
  }

  render() {

    let module = this.props.module,
      moduleMeta = modules(module),
      fieldsToRender = moduleController(module, this.props.siteInfo),
      object = this.props.objJson,
      objTitle, objCreatedBy, objSubTitle, steps = [], subApp = [];

    const { classes } = this.props;

    if (moduleMeta) {
      subApp = moduleMeta.subApp;
      if (subApp) {
        steps.push({ label: `${moduleMeta.label.singular} Detail`, id: module });
        subApp.map(obj => steps.push({ label: obj.lable.plural, id: obj.id }));
      }
    }

    const iconDisplay = (module) => {
      let iconMeta = modules(module).icon;
      let icon;
      switch (iconMeta.name) {
        case 'AccountCircleIcon':
          icon = <AccountCircle className={classes.chipIconBg} />
          break;
        case 'RecentActorsIcon':
          icon = <RecentActors className={classes.chipIconBg} />
          break;
        case 'ContactsIcon':
          icon = <Contacts className={classes.chipIconBg} />
          break;
        case 'AppsIcon':
          icon = <Apps className={classes.chipIconBg} />
          break;
        case 'AssignmentIcon':
          icon = <Assignment className={classes.chipIconBg} />
          break;
        case 'ShoppingCartIcon':
          icon = <ShoppingCart className={classes.chipIconBg} />
          break;
        case 'PlaylistAddCheckIcon':
          icon = <PlaylistAddCheck className={classes.chipIconBg} />
          break;
        case 'BuildIcon':
          icon = <Build className={classes.chipIconBg} />
          break;
      }
      return icon;
    };

    fieldsToRender.filter(function (obj) {
      if (obj.primary) {
        objTitle = object[obj.id];
        if (obj.fk) {
          objTitle = object[obj.id][obj.moduleField];
        }
      }

      if (obj.subPrimary) {
        objSubTitle = object[obj.id]
        if (obj.fk) {
          objSubTitle = object[obj.id][obj.moduleField];
        }
      }

      if (obj.fk && obj.id === 'fk_createdBy') {
        objCreatedBy = object[obj.id][obj.moduleField];
      }
    });

    const handleStep = (step) => () => {
      Router.push(
        '/app/[appId]/[objId]/[subAppId]',
        `/app/${module}/${object.id}/${steps[step].id}`
      );
    };

    fieldsToRender.sort(dynamicSort('section')); // Gropu/rearrange fields by Sections

    const renderFields = (
      <Grid container spacing={2} className={classes.fields} key={`grid-form${Math.random()}`}>
        {
          fieldsToRender.map((data, index) => (
            <React.Fragment key={`layout-frag${Math.random()}`}>
              {
                (
                  (index === 0) ?
                    <Grid className={classes.Section} item xs={12} md={12}>
                      <Typography color="secondary" variant="overline">{fieldsToRender[index]['section']}</Typography>
                    </Grid> :
                    (fieldsToRender[index]['section'] != fieldsToRender[(index - 1)]['section']) ?
                      <Grid className={classes.Section} item xs={12} md={12}>
                        <Typography color="secondary" variant="overline">{fieldsToRender[index]['section']}</Typography>
                      </Grid>
                      :
                      ''
                )
              }
              {
                (
                  (fieldsToRender[index]['type'] == 'Date') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="caption">{fieldsToRender[index]['label']}:</Typography><Typography variant="subtitle2"><Moment format={this.props.siteInfo.dateFormat}>{object[fieldsToRender[index]['iddd']]}</Moment></Typography>
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'DynamicSet') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="caption"> {fieldsToRender[index]['label']}:</Typography>
                    <DynamicSetTable columns={fieldsToRender[index]['fields'][0]} list={object[fieldsToRender[index]['id']]} />
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Currency') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="caption"> {fieldsToRender[index]['label']}:</Typography><Typography variant="subtitle2">&#8377;&nbsp;{object[fieldsToRender[index]['id']].toLocaleString('en-IN')}</Typography>
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Lookup') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="caption">{fieldsToRender[index]['label']}:</Typography>
                    <HtmlTooltip placement="bottom-start" title={<TooltipWindow id={object[fieldsToRender[index]['id']].id} module={fieldsToRender[index]['module']} />} color="secondary">
                      <Typography variant="body2">
                        <Chip
                          icon={iconDisplay(fieldsToRender[index]['module'])}
                          size="small"
                          label={`${object[fieldsToRender[index]['id']][fieldsToRender[index]['moduleField']]}`}
                          onClick={() => Router.push('/app/[appId]/[objId]', `/app/${fieldsToRender[index]['module']}/${object[fieldsToRender[index]['id']].id}`)}
                          clickable
                        />
                      </Typography>
                    </HtmlTooltip>
                  </Grid>
                  || (fieldsToRender[index]['id'] != 'action') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="caption"> {fieldsToRender[index]['label']}:</Typography><Typography variant="subtitle2">{object[fieldsToRender[index]['id']]}</Typography>
                  </Grid>
                )
              }
            </React.Fragment>
          ))
        }
      </Grid>
    );

    const stepRender = (
      <div>
        {renderFields}
      </div>);

    return (
      <Grid container spacing={0} key={`${Math.random()}`}>
        <Grid item xs={12} md={12} key={`${Math.random()}`}>
          <AppBar key={`${Math.random()}`} elevation={0} color="transparent" position="fixed" className={classes.appBar}>
            <Toolbar key={`${Math.random()}`} className={classes.toolbarStyle} variant="dense">
              <div key={`${Math.random()}`}>
                <Typography color="primary" variant="h6">{objTitle} ({objSubTitle})</Typography>
                <Typography color="textSecondary" variant="caption">
                  Created on <Moment format={this.props.siteInfo.dateFormat}>{object.createdAt}</Moment> | Created By {objCreatedBy}
                </Typography>
              </div>
              <div className={classes.grow}>
              </div>
              <Stepper key={Math.random()} className={classes.stepper} nonLinear activeStep={this.state.activeStep}>
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
  mapStateToProps
)(withStyles(useStyles, HtmlTooltip)(DynamicCreate));
