import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent } from 'react';
import { apiContext } from '../../context/ApiContext';

export function ProductForm(
  {
    open,
    handleClose,
    productId,
  }: {
    open: boolean;
    handleClose: () => void;
    productId?: number;
  },
) {
  const {fetchData, putData, postData} = React.useContext(apiContext);
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (productId) {
      putData(`items/${productId}`, {name, description, price, image}).then((res: any) => {
        if (res.status) handleClose();
      });
    } else {
      postData('items', {name, description, price, image}).then((res: any) => {
        if (res.status) handleClose();
      });
    }
  };

  React.useEffect(() => {
    if (productId) {
      fetchData(`items/${productId}`).then((res: any) => {
        setId(res.data.id);
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setImage(res.data.image);
      });
    }
  }, [productId, fetchData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{productId ? `Update Product #${productId}` : 'New Product'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
          {productId ? <div>
            <TextField
              margin="dense"
              id="id"
              name="id"
              label="ID"
              variant="standard"
              value={id}
              disabled
            />
          </div> : null}

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Descrioption"
            multiline
            fullWidth
            variant="standard"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
            fullWidth
            type={'number'}
            variant="standard"
            value={price}
            onChange={event => setPrice(+event.target.value)}
          />

          <TextField
            margin="dense"
            id="image"
            name="image"
            label="Image"
            fullWidth
            variant="standard"
            value={image}
            onChange={event => setImage(event.target.value)}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="subscription-form">
          {!!productId ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}