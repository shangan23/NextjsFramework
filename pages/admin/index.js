import React from 'react';
//import Router from 'next/router';
import { API, IMGPath } from '../../config';
import initialize from '../../utils/initialize';
import Layout from '../../theming/layouts/isUsers';
import DynamicForm from '../../components/Forms/DynamicForm';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class SiteSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    const res = await fetch(`${API}/siteSettings/1`);
    const json = await res.json();
    return { settings: json };
  }

  render() {
    const settingsData = this.props.settings;
    const onFileUpload = async (files) => {
      const formData = new FormData();
      formData.append('logo', files[0]);

      fetch(`${API}/siteSettings/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Basic ${this.props.token}`
        },
      })
        .then(response => response.json());
    };

    const onSubmit = async values => {
      //console.log('==d==', values);
      fetch(`${API}/siteSettings/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.props.token}`
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            throw Error(data.error);
          } else {
            this.props.siteSettings(values);
            window.alert(JSON.stringify(values, 0, 2));
            //Router.push('/admin/users');
          }
        });
    };

    const fieldsToRender = [
      {
        'type': 'Text',
        'required': false,
        'id': 'title',
        'label': 'Site Title',
        'name': 'title',
        'value': settingsData.title
      }, {
        'type': 'Email',
        'required': false,
        'id': 'adminEmail',
        'name': 'adminEmail',
        'label': 'Administrator Email',
        'value': settingsData.adminEmail
      },
      {
        'type': 'Select',
        'required': false,
        'id': 'dateFormat',
        'label': 'Date Format',
        'name': 'dateFormat',
        'data': [
          { 'id': 'MM-DD-YYYY', 'value': 'MM-DD-YYYY' },
          { 'id': 'YYYY-DD-MM', 'value': 'YYYY-DD-MM' },
          { 'id': 'YYYY-MM-DD', 'value': 'YYYY-MM-DD' },
          { 'id': 'DD-MM-YYYY', 'value': 'DD-MM-YYYY' }
        ],
        'value': settingsData.dateFormat
      },
      {
        'type': 'Select',
        'required': false,
        'id': 'timeFormat',
        'label': 'Time Format',
        'name': 'timeFormat',
        'data': [
          { 'id': '24hrs', 'value': '24 Hours' },
          { 'id': '12hrs', 'value': '12 Hours' }
        ],
        'value': settingsData.timeFormat
      },
      {
        'type': 'Text',
        'required': false,
        'id': 'siteThemeColor',
        'label': 'Theme Color',
        'name': 'themeColor',
        'value': settingsData.themeColor
      },

      {
        'type': 'TextArea',
        'required': false,
        'id': 'footer',
        'label': 'Footer',
        'name': 'footer',
        'value': settingsData.footer
      },

      {
        'type': 'Upload',
        'required': false,
        'id': 'adminEmail',
        'name': 'adminEmail',
        'label': 'Upload Logo',
        'accepted': ['image/png'],
        'value': IMGPath + settingsData.logo
      },
    ];
    return (
      <Layout title="General Settings" actions="create">
        <DynamicForm
          fieldsToRender={fieldsToRender}
          defaultValue={settingsData}
          onSubmit={onSubmit}
          buttonCancelText="Cancel"
          buttonSubmitText="Save"
          onFileUpload={onFileUpload}
        />

      </Layout>
    );
  }

}

function mapStateToProps(state) {
  return {
    token: state.authentication.token
  };
}

export default connect(
  mapStateToProps,
  actions
)(SiteSettings);
