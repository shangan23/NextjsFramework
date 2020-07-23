import React from 'react';
import Text from '../Fields/Text';
import Lookup from '../Fields/Lookup';
import { Grid, Button } from '@material-ui/core';

const reloadFieldNames = (arr, id) => {
  arr = JSON.parse(JSON.stringify(arr));
  arr.map((data, pIdx) => {
    data.map((fld, cIdx) => {
      console.log(pIdx);
      let fieldName = fld.name;
      if (fieldName && !fieldName.startsWith(`${id}[${pIdx}].)`)) {
        if (fieldName.indexOf('.') > 0) {
          let fieldIsWithDot = fieldName.split('.');
          fld.name = `${id}[${pIdx}].${fieldIsWithDot[1]}`;
          fld.id = `${id}[${pIdx}].${fieldIsWithDot[1]}`;
        } else {
          fld.name = `${id}[${pIdx}].${fieldName}`;
          fld.id = `${id}[${pIdx}].${fieldName}`;
        }
      }
    })
  });
  return arr;
}

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

  async handleLoad() {
    let newField = [];
    if (this.props.defaultData[this.props.fieldsToRender[this.props.index]['id']]) {
      this.props.defaultData[this.props.fieldsToRender[this.props.index]['id']].map((el, ix) => {
        newField = newField.concat(this.props.fieldsToRender[this.props.index]['fields']);
      });
    } else {
      newField = newField.concat(this.props.fieldsToRender[this.props.index]['fields']);
    }
    let newArray = await reloadFieldNames(newField, this.props.fieldsToRender[this.props.index]['id']);
    this.setState({ fieldList: newArray });
  }

  render() {
    const label = this.props.fieldsToRender[this.props.index]['label'];

    const handleRemoveClick = index => {
      const list = this.state.fieldList;
      list.splice(index, 1);
      this.setState({ fieldList: list });
    };

    const handleAddClick = () => {
      let currentFieldList = this.state.fieldList;
      let newField = this.props.fieldsToRender[this.props.index]['fields'];
      newField = newField.concat(currentFieldList);
      let fieldsToAdd = reloadFieldNames(newField, this.props.fieldsToRender[this.props.index]['id']);
      this.setState({ fieldList: fieldsToAdd });
    };

    const fields = this.state.fieldList;

    const field = (type, parentIndex, childIndex) => {
      let fieldIs;
      switch (type) {
        case 'Text':
          fieldIs = <Text index={childIndex} fieldsToRender={fields[parentIndex]} />
          break;
        case 'Lookup':
          fieldIs = <Lookup index={childIndex} fieldsToRender={fields[parentIndex]} />
          break;
        case 'Action':
          fieldIs = <React.Fragment>
            {fields.length !== 1 && <Button onClick={() => handleRemoveClick(parentIndex)}>Remove</Button>}
            {fields.length - 1 === parentIndex && <Button onClick={handleAddClick}>Add</Button>}
          </React.Fragment>
          break;
      }
      return fieldIs;
    };

    const renderFields = (
      <Grid container spacing={2} style={{ margin: 4 }} key={`${Math.random()}`}>
        {
          fields.map((data, parentIndex) => (
            <React.Fragment key={`${Math.random()}`} >
              {
                <React.Fragment key={`${Math.random()}`} >
                  {fields[parentIndex].map((fld, childIndex) => {
                    return (fld['type'] != 'ReadOnly' ? <Grid item xs={4} md={4} key={`${Math.random()}`}>{field(fld['type'], parentIndex, childIndex)}</Grid> : '');
                  })}
                </React.Fragment>
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