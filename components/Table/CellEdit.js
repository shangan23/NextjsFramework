import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from '../Forms/DialogForm';

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CellEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { renderView: 'onlyAction' };
  }

  handleClick() {
    console.log(this.props.cellData.rowData[0]);
    this.setState({ renderView: 'withDialogForm' });
  }

  render() {
    const onClose = () => {
      this.setState({ renderView: 'onlyAction' });
    };

    if (this.state.renderView == 'onlyAction') {
      return (
        <React.Fragment>
          <button onClick={() => this.handleClick()}>
            Edit
          </button>
        </React.Fragment>
      );
    } else if (this.state.renderView == 'withDialogForm') {
      return (
        <React.Fragment>
          <button onClick={() => this.handleClick()}>
            Edit
          </button>
          <DialogForm objectId={this.props.cellData.rowData[0]} module={this.props.module} action="edit" isOpen={true} onClose={onClose} />
        </React.Fragment>
      );
    }
  }
}

export default withStyles(defaultToolbarStyles, { name: 'CellEdit' })(CellEdit);
