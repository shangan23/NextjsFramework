import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { API } from '../config';
import Router from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    //console.log('Browser =',whichBrowser);
    //console.log('---- componentDidMount -----');
    fetch(`${API}/siteSettings/1`)
      .then((res) => res.json())
      .then((data) => {
        //console.log('---- componentDidMount - data dispatch -----');
        this.props.siteSettings(data);
        //console.log('---- componentDidMount - propsAction -----', propsAction);
        //window.addEventListener('load', this.handleLoad);
        window.onload = this.handleLoad();
      }
      );

  }

  componentWillUnmount() {
    //console.log('---- componentWillUnmount -----');
    //window.removeEventListener('load', this.handleLoad);
    window.onload = '';
  }

  handleLoad() {
    //console.log('---- handle load -----');
    if (this.props.isAuthenticated) {
      Router.push('/admin');
    } else {
      Router.push('/signin');
    }
  }

  render() {
    //console.log('---- render -----');
    return (
      <p>
        Loading ...
      </p>
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
