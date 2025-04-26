import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiclient';
import { Customer } from '../api/types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Button, Snackbar } from '@mui/material';
import { AddCustomer } from './AddCustomer';
import { EditCustomer } from './EditCustomer';

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const fetchCustomers = () => {
    console.log('Fetching customers...!');
    apiClient.get<{ _embedded: { customers: Customer[] } }>('customers')
      .then(res => setCustomers(res._embedded.customers))
      .catch(err => console.error('Error fetching customers:', err));
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  // save new customer
  const saveCustomer = (customer: Customer) => {
    apiClient.post<Customer>('customers', customer)
      .then(() => {
        fetchCustomers();
        showSnackbar('Customer added successfully!');
      })
      .catch(err => console.error('Error saving customer:', err));
  };

  // update existing customer
  const updateCustomer = (customer: Customer, link: string) => {
    apiClient.put(link, customer)
      .then(() => {
        fetchCustomers();
        showSnackbar('Customer updated successfully!');
      })
      .catch(err => console.error('Error updating customer:', err));
  };

  // delete customer
  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      apiClient.delete(params.data._links.self.href)
        .then(() => {
          fetchCustomers();
          showSnackbar('Customer deleted successfully!');
        })
        .catch(err => console.error('Error deleting customer:', err));
    }
  };

  // display snackbar notification
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const columnDefs: ColDef[] = [
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
    { field: 'streetaddress', headerName: 'Address', sortable: true, filter: true },
    { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true },
    { field: 'city', headerName: 'City', sortable: true, filter: true },
    { 
      headerName: 'Actions',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        <EditCustomer 
          customer={params.data} 
          updateCustomer={updateCustomer} 
          fetchCustomers={fetchCustomers} 
        />
      )
    },
    { 
      headerName: '',
      width: 100,
      cellRenderer: (params: ICellRendererParams) => (
        <Button 
          size="small" 
          color="error" 
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
      ) 
    }
  ];

  return (
    <div style={{ height: '100%', width: '100%', padding: '20px' }}>
      <h1>Customers</h1>
      
      <AddCustomer saveCustomer={saveCustomer} />
      
      <div 
        className="ag-theme-alpine" 
        style={{ height: 'calc(100vh - 180px)', width: '100%', marginTop: '20px' }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true
          }}
        />
      </div>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};