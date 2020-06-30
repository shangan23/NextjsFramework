import React from 'react';
import initialize from '../../../utils/initialize';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";
import { dynamicSort } from '../../../utils/helper';
import {
  Grid
} from '@material-ui/core';
import { getCookie } from '../../../utils/cookie';
import moduleController from '../../../modules/controller';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  appBar: {
    top: theme.spacing(0),
    //marginLeft: theme.spacing(-2),
    position: 'relative'
  },
  toolbarStyle: {
    minHeight: theme.spacing(1),
    marginLeft: theme.spacing(-2)
  },
  paperDetails: {
    padding: theme.spacing(1),
    maxHeight: theme.spacing(63.5),
    overflow: 'scroll',
  },
  Section: {
    padding: theme.spacing(3),
    minHeight: theme.spacing(20)
  },
  grow: {
    flexGrow: 1,
  }
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
    let module = this.props.module;
    let fieldsToRender = moduleController(module, this.props.siteInfo);
    const { classes } = this.props;
    let object = this.props.objJson;

    console.log(object);
    let objTitle, objCreatedBy;
    fieldsToRender.filter(function (obj) {
      if (obj.primary) {
        objTitle = object[obj.id];
      }
      if(obj.fk && obj.id === 'fk_createdBy'){
        objCreatedBy = object['fk_createdBy'].fullName;
      }
    });



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
                  (fieldsToRender[index]['type'] == 'Date') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="subtitle2">{fieldsToRender[index]['label']}:<Typography variant="body2"><Moment format={this.props.siteInfo.dateFormat}>{object[fieldsToRender[index]['iddd']]}</Moment></Typography></Typography>
                  </Grid>
                  || (fieldsToRender[index]['type'] == 'Lookup') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="subtitle2">{fieldsToRender[index]['label']}:<Typography variant="body2">{object[fieldsToRender[index]['id']][fieldsToRender[index]['moduleField']]}</Typography></Typography>
                  </Grid>
                  || (fieldsToRender[index]['id'] != 'action') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="subtitle2"> {fieldsToRender[index]['label']}:<Typography variant="body2">{object[fieldsToRender[index]['id']]}</Typography></Typography>
                  </Grid>
                  || (fieldsToRender[index]['id'] != 'id') &&
                  <Grid item xs={12} md={4} key={index}>
                    <Typography variant="subtitle2"> {fieldsToRender[index]['label']}:<Typography variant="body2">{object[fieldsToRender[index]['id']]}</Typography></Typography>
                  </Grid>
                )
              }
            </React.Fragment>
          ))
        }
      </Grid>
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
            </Toolbar>
          </AppBar>
          <Paper elevation={0} variant="outlined" className={classes.paperDetails}>
            {renderFields}
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
)(withStyles(useStyles)(DynamicCreate));
