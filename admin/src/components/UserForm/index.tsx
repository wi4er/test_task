import * as React from 'react';
import { apiContext } from '../../context/ApiContext';
import { FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function UserForm(
  {
    open,
    handleClose,
    userId,
  }: {
    open: boolean;
    handleClose: () => void;
    userId?: number;
  },
) {
  const {fetchData, putData, postData} = React.useContext(apiContext);
  const [id, setId] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('user');
  const [error, setError] = React.useState<any>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (userId) {
      putData(
        `users/${userId}`,
        {email, first_name: firstName, last_name: lastName, role, password: password || null},
      ).then((res: any) => {
        if (res.status) handleClose();
        else setError(res.error);
      });
    } else {
      postData(
        'users',
        {email, first_name: firstName, last_name: lastName, role, password},
      ).then((res: any) => {
        if (res.status) handleClose();
        else setError(res.error);
      });
    }
  };

  React.useEffect(() => {
    if (userId) {
      fetchData(`users/${userId}`).then((res: any) => {
        if (res.status) {
          setId(res.data.id);
          setEmail(res.data.email);
          setFirstName(res.data.first_name);
          setLastName(res.data.last_name);
          setRole(res.data.role);
        }
      });
    }
  }, [userId, fetchData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New user</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
          {!!userId && <TextField
              margin="dense"
              id="id"
              name="id"
              label="ID"
              variant="standard"
              value={id}
              disabled
          />}

          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Emai"
            fullWidth
            variant="standard"
            type={'email'}
            value={email}
            onChange={event => setEmail(event.target.value)}
            error={!!error.email}
            helperText={error.email}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="first_name"
            label="First Name"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
          />

          <TextField
            margin="dense"
            id="name"
            name="last_name"
            label="Last Name"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />

          <TextField
            margin="dense"
            id="name"
            name="password"
            label="Password"
            fullWidth
            variant="standard"
            value={password}
            onChange={event => setPassword(event.target.value)}
            error={!!error.password}
            helperText={error.password}
          />

          <Select
            id="demo-simple-select"
            value={role}
            fullWidth
            label="Role"
            onChange={event => setRole(event.target.value)}
          >
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'user'}>User</MenuItem>
          </Select>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="subscription-form">
          {!!userId ? 'Save' : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}