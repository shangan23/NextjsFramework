import fetch from 'cross-fetch';
import React from 'react';
import { Autocomplete } from 'mui-rff';
import { connect } from 'react-redux';
import { API } from '../../config';

class Lookup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, options: [], loading: false };
    this.handleLoad = this.handleLoad.bind(this);
  }

  getModuleObjects() {
    fetch(`${API}/users`, {
      headers: {
        'Authorization': `Basic ${this.props.token}`
      },
    }).then((res) => res.json())
      .then((data) => {
        this.setState({ options: data.rows });
      });
  }

  componentDidMount() {
    const loading = this.state.open && this.state.options.length === 0;

    if (!loading) {
      this.setState({ loading: true });
    }

    window.onload = this.handleLoad();
  }

  componentWillUnmount() {
    window.onload = '';
  }

  handleLoad() {
    fetch(`${API}/users`, {
      headers: {
        'Authorization': `Basic ${this.props.token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data.rows ', data.rows);
        this.setState({ options: data.rows });
        this.setState({ loading: false });
        //this.setState({ open: true });
      });
  }

  render() {
    const attributes = this.props.fieldsToRender;
    const index = parseInt(this.props.index);
    const options = this.state.options;

    const handleChange = (event, value, reason) => {
      this.getModuleObjects();
      console.log('onchange triggered', reason);
      console.log(event, value);
    };

    return (
      <Autocomplete
        required={attributes[index]['required']}
        label={attributes[index]['label']}
        name={attributes[index]['name']}
        id={attributes[index]['id']}
        open={this.state.open}
        onInputChange={handleChange}
        onOpen={() => {
          this.setState({ open: true });
        }}
        onClose={() => {
          this.setState({ open: false });
        }}
        getOptionSelected={(option, value) => option.fullName === value.fullName}
        getOptionLabel={(option) => option.fullName?option.fullName:''}
        options={options}
        loading={this.state.loading}
      />
    );
  }
}

const mapStateToProps = (state) => (
  {
    token: state.authentication.user.token
  }
);

export default connect(mapStateToProps)(Lookup);