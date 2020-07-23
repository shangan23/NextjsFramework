import React from 'react';
import initialize from '../../../utils/initialize';
import DynamicForm from '../../../components/Forms/UserDynamicForm';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";

const frameURL = async (req) => {
  let host, urlObj;
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let module;
  console.log(urlObj);
  let { pathname } = urlObj;
  module = pathname.replace('/app/', '');
  return { module }
};



class DynamicCreate extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      let module = ctx.query.appId;
      console.log('iClient Router module', module);
      console.log('iClient ctx', ctx.query.appId);
      return { module: module };
    } else {
      const { module } = await frameURL(req);
      return { module };
    }
  }

  render() {
    const settingsData = {};
    const onSubmit = async values => {
      window.alert(JSON.stringify(values, 0, 2));
    };

    let module = this.props.module;

    return (
      <DynamicForm
        listLink={''}
        formTitle={'create'}
        module={module}
        action="new"
        defaultValue={settingsData}
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
)(DynamicCreate);
