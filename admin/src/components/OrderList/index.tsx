import React from 'react';
import { apiContext } from '../../context/ApiContext';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Visibility';
import { OrderEntity } from '../../model/Order.entity';

export function OrderList() {
  const {fetchData} = React.useContext(apiContext);
  const [list, setList] = React.useState<Array<OrderEntity>>([]);
  const [edit, setEdit] = React.useState<number | null>(null);

  async function fetchOrderList() {
    fetchData('orders').then((res: any) => setList(res.data));
  }

  React.useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          Order List
        </Typography>
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
                color="primary"
                aria-label="edit"
                sx={{mr: 2}}
                onClick={() => setEdit(element.row.id)}
              >
                <EditIcon />
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
            field: 'amount',
            headerName: 'Amount',
            width: 150,
          },
          {
            field: 'count',
            headerName: 'Item count',
            width: 150,
            valueGetter: (value, row) => row.order_description.length
          }
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
    </div>
  );
}