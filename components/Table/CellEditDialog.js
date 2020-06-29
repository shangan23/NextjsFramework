import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from '../Forms/DialogForm';
import { Button } from '@material-ui/core';

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CellEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { renderView: 'onlyAction' };
  }

  handleClick(e) {
    //e.stopPropagation();
    console.log(this.props.cellData);
    this.setState({ renderView: 'withDialogForm' });
  }

  render() {
    const onClose = () => {
      this.setState({ renderView: 'onlyAction' });
    };

    if (this.state.renderView == 'onlyAction') {
      return (
        <React.Fragment>
          <Button color='secondary' onClick={(e) => this.handleClick(e)}>
            Edit
          </Button>
        </React.Fragment>
      );
    } else if (this.state.renderView == 'withDialogForm') {
      return (
        <React.Fragment>
          <Button color='secondary' onClick={(e) => this.handleClick(e)}>
            Edit
          </Button>
          <DialogForm objectId={this.props.cellData.id} module={this.props.module} action="edit" isOpen={true} onClose={onClose} />
        </React.Fragment>
      );
    }
  }
}

export default withStyles(defaultToolbarStyles, { name: 'CellEdit' })(CellEdit);
