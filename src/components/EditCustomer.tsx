import { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  Stack
} from '@mui/material';
import { Customer } from '../api/types';

interface EditCustomerProps {
  customer: Customer;
  updateCustomer: (customer: Customer, link: string) => void;
  fetchCustomers: () => void;
}

export const EditCustomer = ({ customer, updateCustomer, fetchCustomers }: EditCustomerProps) => {
  const [open, setOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer>({...customer});

  const handleOpen = () => {
    setEditedCustomer({...customer});
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = () => {
    updateCustomer(editedCustomer, customer._links.self.href);
    handleClose();
  };

  return (
    <>
      <Button 
        size="small" 
        color="primary" 
        onClick={handleOpen}
      >
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: '300px' }}>
            <TextField
              name="firstname"
              label="First Name"
              value={editedCustomer.firstname}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="lastname"
              label="Last Name"
              value={editedCustomer.lastname}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={editedCustomer.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone"
              value={editedCustomer.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="streetaddress"
              label="Street Address"
              value={editedCustomer.streetaddress}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="postcode"
              label="Postcode"
              value={editedCustomer.postcode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
              label="City"
              value={editedCustomer.city}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};