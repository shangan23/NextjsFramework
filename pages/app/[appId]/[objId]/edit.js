import React from 'react';
import initialize from '../../../../utils/initialize';
import DynamicForm from '../../../../components/Forms/UserDynamicForm';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";

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

class DynamicEdit extends React.Component {
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
    const onSubmit = async values => {
      window.alert(JSON.stringify(values, 0, 2));
    };

    let module = this.props.module;

    return (
      <DynamicForm
        listLink={'Edit'}
        formTitle={'Edit'}
        module={module}
        action="edit"
        defaultValue={this.props.objJson}
        onSubmit={onSubmit}
        buttonCancelText="Cancel"
        buttonSubmitText="Save"
      />
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
)(DynamicEdit);
