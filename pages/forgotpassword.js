import React from 'react';
import Anonymous from '../theming/layouts/anonymous';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class ForgotPassword extends React.Component {
 
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Anonymous title="Forgot Password">
        <form noValidate onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Next
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/signin" variant="body2">
                Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Anonymous >
    );
  }
}

export default ForgotPassword;