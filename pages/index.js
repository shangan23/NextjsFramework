import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Router from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    fetch('api/settings')
      .then((res) => res.json())
      .then((data) => {
        this.props.siteSettings(data);
        this.props.notifications(null);
        window.onload = this.handleLoad();
      });

  }

  componentWillUnmount() {
    window.onload = '';
  }

  handleLoad() {
    if (this.props.isAuthenticated) {
      Router.push('/dashboard');
    } else {
      Router.push('/signin');
    }
  }

  render() {
    return (
      <React.Fragment>
        Loading ...
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => (
  {
    isAuthenticated: !!state.authentication.user,
    siteTitle: state.siteSettings.title
  }
);

export default connect(mapStateToProps, actions)(Index);
