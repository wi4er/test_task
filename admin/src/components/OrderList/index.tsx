import css from './index.module.css';
import React from 'react';
import { apiContext } from '../../context/ApiContext';
import { UserEntity } from '../../model/User.entity';
import { productContext } from '../ProductList/product.context';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../ProductList/columns';
import { ProductForm } from '../ProductForm';

export function OrderList() {
  const {fetchData, deleteData} = React.useContext(apiContext);
  const [list, setList] = React.useState<Array<UserEntity>>([]);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editProduct, setEditProduct] = React.useState<number>(0);

  async function fetchProductList() {
    fetchData('items').then((res: any) => setList(res.data));
  }

  React.useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <productContext.Provider value={{
      openEdit: (id: number) => {
        setEdit(true);
        setEditProduct(id);
      },
      deleteItem: (id: number) => {
        deleteData(`items/${id}`).then((res: any) => {
          if (res.status) fetchProductList();
        });
      },
    }}>
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
          onClick={() => setEdit(true)}
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
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      <ProductForm
        open={edit}
        productId={editProduct}
        handleClose={() => {
          setEdit(false);
          fetchProductList();
        }}
      />
    </productContext.Provider>
  );
}