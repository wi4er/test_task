import React from 'react';
import css from './index.module.css';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { UserEntity } from '../../model/User.entity';
import { apiContext } from '../../context/ApiContext';
import { UserForm } from '../UserForm';
import EditIcon from '@mui/icons-material/Edit';

export function UserList() {
  const {fetchData, deleteData} = React.useContext(apiContext);
  const [list, setList] = React.useState<Array<UserEntity>>([]);
  const [edit, setEdit] = React.useState<number | null>(null);

  async function fetchUserList() {
    fetchData('users').then((res: any) => setList(res.data));
  }

  React.useEffect(() => {
    fetchData('users').then((res: any) => setList(res.data));
  }, []);

  return (
    <div>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          User List
        </Typography>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
          onClick={() => setEdit(0)}
        >
          <AddIcon/>
        </IconButton>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
          onClick={() => {
          }}
        >
          <DeleteIcon/>
        </IconButton>
      </Toolbar>

      <DataGrid
        rows={list ?? []}
        columns={[
          {
            field: 'edit',
            headerName: '',
            width: 50,
            renderCell: element => (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="edit"
                sx={{mr: 2}}
                onClick={() => setEdit(element.row.id)}
              >
                <EditIcon/>
              </IconButton>
            ),
          },
          {
            field: 'remove',
            headerName: '',
            width: 50,
            renderCell: element => (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="edit"
                sx={{mr: 2}}
                onClick={() => {
                  deleteData(`users/${element.row.id}`).then((res: any) => {
                    if (res.status) fetchUserList();
                  });
                }}
              >
                <DeleteIcon/>
              </IconButton>
            ),
          },
          {field: 'id', headerName: 'ID', width: 90},
          {
            field: 'created_at',
            headerName: 'Created',
            width: 200,
          },
          {
            field: 'email',
            headerName: 'Email',
            width: 150,
          },
          {
            field: 'first_name',
            headerName: 'First name',
            width: 150,
          },
          {
            field: 'last_name',
            headerName: 'Last name',
            width: 150,
          },
          {
            field: 'role',
            headerName: 'Role',
            type: 'string',
            width: 110,
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 24,
            },
          },
        }}
        pageSizeOptions={[24]}
      />

      {edit !== null && <UserForm
          open={true}
          userId={edit}
          handleClose={() => {
            setEdit(null);
            fetchUserList();
          }}
      />}
    </div>
  );
}
