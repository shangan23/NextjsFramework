import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from '../Forms/DialogForm';
import Snack from '../Snack';

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { renderView: 'onlyAction' };
  }

  handleClick() {
    console.log(this.props.module);
    this.setState({ renderView: 'withDialogForm' });
  }

  render() {
    const { classes } = this.props;

    const onClose = () => {
      this.setState({ renderView: 'onlyAction' });
    };

    if (this.state.renderView == 'onlyAction') {
      return (
        <React.Fragment>
          <Tooltip title={'Add'}>
            <IconButton className={classes.iconButton} onClick={() => this.handleClick()}>
              <AddIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    } else if (this.state.renderView == 'withDialogForm') {
      return (
        <React.Fragment>
          <Tooltip title={'Add'}>
            <IconButton className={classes.iconButton} onClick={() => this.handleClick()}>
              <AddIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
          <DialogForm module={this.props.module} action="new" isOpen={true} onClose={onClose} />
        </React.Fragment>
      );
    } else if (this.state.renderView == 'withDialogForm') {
      return (
        <React.Fragment>
          <Tooltip title={'Add'}>
            <IconButton className={classes.iconButton} onClick={() => this.handleClick()}>
              <AddIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
          <Snack />
        </React.Fragment>
      );
    }
  }
}
export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar);
