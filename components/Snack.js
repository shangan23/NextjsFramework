import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function Snack() {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'bottom',
    horizontal: 'left',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>
  );
}
