import React from 'react';
import css from './index.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { userContext } from '../../context/UserContext';

export function AuthForm() {
  const {user, fetchUser, error} = React.useContext(userContext);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className={css.root}>
      <Dialog
        open={user === null}
        onSubmit={event => {
          event.preventDefault();

          fetchUser(login, password)
        }}
      >
        <DialogTitle>Authorization</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>

          <form id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="login"
              name="login"
              label="Login"
              fullWidth
              variant="standard"
              value={login}
              onChange={event => setLogin(event.target.value)}
              error={error}
              helperText={error}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button type="submit" form="subscription-form">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}