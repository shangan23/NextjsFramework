import fetch from 'cross-fetch';
import React from 'react';
import { Autocomplete } from 'mui-rff';
import { connect } from 'react-redux';
import { API } from '../../config';
import Hidden from '@material-ui/core/Hidden';

class Lookup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, options: [], loading: false };
    this.handleLoad = this.handleLoad.bind(this);
  }

  getModuleObjects(value) {
    let module = this.props.fieldsToRender[parseInt(this.props.index)]['module'];
    let filterArray = [];
    filterArray.push({ k: this.props.fieldsToRender[parseInt(this.props.index)]['moduleField'], o: 'contain', v: escape(value), lo: 'AND' });
    let filter = `?filter=${JSON.stringify(filterArray)}`;

    fetch(`${API}/${module}${filter}`, {
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
    let module = this.props.fieldsToRender[parseInt(this.props.index)]['module'];
    fetch(`${API}/${module}`, {
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
    const source = this.props.source;
    const moduleField = attributes[index]['moduleField'];

    const handleChange = (event, value, reason) => {
      if (value.length >= 3) {
        this.getModuleObjects(value);
        console.log('onchange triggered', reason);
        console.log(event, value);
      }
    };

    const field = (
      <Autocomplete
        label={attributes[index]['label']}
        name={attributes[index]['name']}
        id={attributes[index]['id']}
        //disabled={attributes[index]['disabled']}
        open={this.state.open}
        size="small"
        onInputChange={handleChange}
        onOpen={() => {
          this.setState({ open: true });
        }}
        onClose={() => {
          this.setState({ open: false });
        }}
        getOptionSelected={(option, value) => option[moduleField] === value[moduleField]}
        getOptionLabel={(option) => option[moduleField] ? option[moduleField] : ''}
        options={options}
        loading={this.state.loading}
      />
    );

    if (attributes[index]['disabled'] && !source)
      return <Hidden mdDown smDown lgDown xlDown xsDown>{field}</Hidden>;

    return <React.Fragment>{field}</React.Fragment>;


  }
}

const mapStateToProps = (state) => (
  {
    token: state.authentication.user.token
  }
);

export default connect(mapStateToProps)(Lookup);