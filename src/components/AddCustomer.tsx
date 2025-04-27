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

interface AddCustomerProps {
  saveCustomer: (customer: Customer) => void;
}

export const AddCustomer = ({ saveCustomer }: AddCustomerProps) => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = () => {
    saveCustomer(customer);
    setCustomer({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: ''
    });
    handleClose();
  };

  return (
    <>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        style={{ marginBottom: 20 }}
      >
        Add Customer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: '300px' }}>
            <TextField
              name="firstname"
              label="First Name"
              value={customer.firstname}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="lastname"
              label="Last Name"
              value={customer.lastname}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={customer.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone"
              value={customer.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="streetaddress"
              label="Street Address"
              value={customer.streetaddress}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="postcode"
              label="Postcode"
              value={customer.postcode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
              label="City"
              value={customer.city}
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