import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiclient';
import { Customer } from '../api/types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Button, Snackbar, Box } from '@mui/material';
import { AddCustomer } from './AddCustomer';
import { EditCustomer } from './EditCustomer';
import { AddTrainingForCustomer } from './AddTrainingForCustomer';
import { CustomerStats } from './CustomerStats';

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

  // export customers to CSV
  const exportToCSV = () => {
    // the fields we want to include in the CSV
    const fields = ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'];
    
    let csvContent = fields.join(',') + '\n';

    customers.forEach(customer => {
      const row = fields.map(field => {
        // get the field value and wrap it in quotes
        // if the value is null or undefined, use an empty string
        const value = customer[field as keyof typeof customer] || '';
        return `"${value}"`;
      });
      
      csvContent += row.join(',') + '\n';
    });
    
    // create a 'blob' object and a link to download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'customers.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSnackbar('Customers exported successfully!');
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
      headerName: 'Stats',
      width: 90,
      cellRenderer: (params: ICellRendererParams) => (
        <CustomerStats customer={params.data} />
      )
    },
    { 
      headerName: 'Edit',
      width: 90,
      cellRenderer: (params: ICellRendererParams) => (
        <EditCustomer 
          customer={params.data} 
          updateCustomer={updateCustomer} 
          fetchCustomers={fetchCustomers} 
        />
      )
    },
    { 
      headerName: 'Add Training',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        <AddTrainingForCustomer 
          customer={params.data} 
          onTrainingAdded={() => showSnackbar('Training added successfully!')} 
        />
      )
    },
    { 
      headerName: 'Delete',
      width: 90,
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
    
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <AddCustomer saveCustomer={saveCustomer} />
      <Button 
        variant="contained"
        color="primary"
        onClick={exportToCSV}
        style={{ marginBottom: 20 }}
      >
        Export to CSV
      </Button>
    </Box>
    
    <div 
      className="ag-theme-alpine" 
      style={{ height: 'calc(100vh - 180px)', width: '100%', marginTop: '20px' }}
    >
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
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