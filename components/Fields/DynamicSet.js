import React from 'react';
import Text from '../Fields/Text';
import Lookup from '../Fields/Lookup';
import { Grid, Button } from '@material-ui/core';

class DynamicSet extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fieldList: [], setValue: [] };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.onload = this.handleLoad();
  }

  componentWillUnmount() {
    window.onload = '';
  }

  handleLoad() {
    this.setState({ fieldList: this.props.fieldsToRender[this.props.index]['fields'] });
  }

  render() {
    const label = this.props.fieldsToRender[this.props.index]['label'];

    const handleRemoveClick = index => {
      const list = this.state.fieldList;
      list.splice(index, 1);
      list.splice(index - 1, 1);
      list.splice(index - 2, 1);
      this.setState({ fieldList: list });
    };

    const handleAddClick = () => {
      let currentFields = this.state.fieldList;
      let fieldsToAdd = this.props.fieldsToRender[this.props.index]['fields'];
      this.setState({ fieldList: [...currentFields, ...fieldsToAdd] });
    };

    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = this.state.fieldList;
      list[index][name] = value;
      //setInputList(list);
    };

    const fields = this.state.fieldList;

    const field = (type, id) => {
      let fieldIs;
      switch (type) {
        case 'Text':
          fieldIs = <Text index={id} fieldsToRender={fields} onChange={e => handleInputChange(e, i)} />
          break;
        case 'Lookup':
          fieldIs = <Lookup index={id} fieldsToRender={fields} onChange={e => handleInputChange(e, i)} />
          break;
        case 'Action':
          fieldIs = <React.Fragment>
            {fields.length !== 3 && <Button onClick={() => handleRemoveClick(id)}>Remove</Button>}
            {fields.length - 1 === id && <Button onClick={handleAddClick}>Add</Button>}
          </React.Fragment>
          break;
      }
      return fieldIs;
    };

    const renderFields = (
      <Grid container spacing={2} style={{ margin: 4 }} key={`grid-dialog${Math.random()}`}>
        {
          fields.map((data, idx) => (
            <React.Fragment key={`fragment-dialog${Math.random()}`} >
              {
                <Grid item xs={4} md={4} key={idx}>
                  {field(data['type'], idx)}
                </Grid>
              }
            </React.Fragment>
          ))
        }
      </Grid>
    );

    return <React.Fragment>{label}{renderFields}</React.Fragment>;

  }
}

export default (DynamicSet);