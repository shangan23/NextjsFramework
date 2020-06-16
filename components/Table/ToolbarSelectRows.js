import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Router from 'next/router';
import { API } from '../../config';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: '24px',
  },
  inverseIcon: {
    transform: 'rotate(90deg)',
  },
  infoBox: {
    float: 'left',
    padding: '10px'
  },
  infoBoxIcon: {
    fontSize: '60px',
    //color:'red' // ThemeControl
  }
};

class CustomToolbarSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false};
  }

  render() {

    const { classes } = this.props;

    const handleDialogOpen = () => {
      this.setState({ open: true });
    };

    const handleClickInverseSelection = () => {
      const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
        if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
          nextSelectedRows.push(index);
        }

        return nextSelectedRows;
      }, []);

      this.props.setSelectedRows(nextSelectedRows);
    };

    const handleClickDeselectAll = () => {
      this.props.setSelectedRows([]);
    };

    const handleCancelAction = () => {
      this.setState({ open: false });
    };

    const deleteObject = (row) => {
      const objectId = this.props.displayData[row.dataIndex]['data'][0];
      fetch(`${API}/${this.props.module}/${objectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.props.token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('data',data);
          this.props.notifications(data);
        });
    };

    const handleConfirmAction = () => {
      if (this.props.selectedRows.data.map(deleteObject)) {
        this.setState({ open: false });
        this.props.setSelectedRows([]);
        Router.push(`/admin/${this.props.module}`);
      }
    };

    const confirmDeleteDialog = (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.infoBox}><DeleteIcon className={classes.infoBoxIcon} /></div>
            <div>
              Confirming this action will delete the selected records permanently.<br /><br />
              <Typography variant="body2">Warning: This action cannot be undone!</Typography>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleCancelAction} color="secondary">
            Cancel
          </Button>
          <Button id="cancel" onClick={handleConfirmAction} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );

    const tooltip = (<div>
      <Tooltip title={'Deselect ALL'}>
        <IconButton className={classes.iconButton} onClick={handleClickDeselectAll}>
          <IndeterminateCheckBoxIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Inverse Selection'}>
        <IconButton className={classes.iconButton} onClick={handleClickInverseSelection}>
          <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(' ')} />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Delete Selected'}>
        <IconButton className={classes.iconButton} onClick={handleDialogOpen}>
          <DeleteIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </div>);

    return (
      <div className={classes.iconContainer}>
        {confirmDeleteDialog}
        {tooltip}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    siteDetails: state.siteSettings.settings,
    token: state.authentication.user.token
  }
);

export default connect(mapStateToProps, actions)(withStyles(defaultToolbarSelectStyles, { name: 'CustomToolbarSelect' })(CustomToolbarSelect));