import React from 'react';
import { UserEntity } from '../../model/User.entity';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { ProductForm } from '../ProductForm';
import { apiContext } from '../../context/ApiContext';
import EditIcon from '@mui/icons-material/Edit';

export function ProductList() {
  const {fetchData, deleteData} = React.useContext(apiContext);
  const [list, setList] = React.useState<Array<UserEntity>>([]);
  const [edit, setEdit] = React.useState<number | null>(null);

  async function fetchProductList() {
    fetchData('items').then((res: any) => setList(res.data));
  }

  React.useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          Product List
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
                  deleteData(`items/${element.row.id}`).then((res: any) => {
                    if (res.status) fetchProductList();
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
            editable: true,
          },
          {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
          },
          {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
          },
          {
            field: 'image',
            headerName: 'Image',
            width: 150,
            editable: true,
          },
          {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      {edit !== null &&
          <ProductForm
              open={true}
              productId={edit}
              handleClose={() => {
                setEdit(null);
                fetchProductList();
              }}
          />
      }
    </div>
  );
}