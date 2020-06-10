import React from 'react';
//import Router from 'next/router';
import { API,IMGPath } from '../../config';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import CreateLayout from '../../theming/layouts/create';
import TwoColumn from '../../components/Forms/TwoColumn';
import AdminMenu from '../../components/AdminMenu';

class SiteSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    const token = ctx.store.getState().authentication.token;
    const header = { 'Authorization': `Basic ${token}` };
    const res = await fetch(`${API}/siteSettings/1`, { headers: header });
    const json = await res.json();
    console.log(json);
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
          'Authorization': `Basic ${this.props.authentication.token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const onSubmit = async values => {
      fetch(`${API}/siteSettings/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.props.authentication.token}`
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            throw Error(data.error);
          } else {
            window.alert(JSON.stringify(data, 0, 2));
            //Router.push('/admin/users');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
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
        'value': IMGPath+settingsData.logo
      },
    ];
    return (
      <CreateLayout title="General Settings" actions="create">
        <AdminMenu />
        <TwoColumn
          fieldsToRender={fieldsToRender}
          onSubmit={onSubmit}
          buttonCancelText="Cancel"
          buttonSubmitText="Save"
          onFileUpload={onFileUpload}
        />
        
      </CreateLayout>
    );
  }

}

export default connect(state => state)(SiteSettings);
