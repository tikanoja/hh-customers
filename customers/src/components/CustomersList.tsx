import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Customer } from '../api/types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const fetchCustomers = () => {
    apiClient.get<{ _embedded: { customers: Customer[] } }>('customers')
      .then(res => setCustomers(res._embedded.customers))
      .catch(err => console.error('Error fetching customers:', err));
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const columnDefs: ColDef[] = [
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
    { field: 'streetaddress', headerName: 'Address', sortable: true, filter: true },
    { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true },
    { field: 'city', headerName: 'City', sortable: true, filter: true }
  ];

  return (
    <div style={{ height: '100%', width: '100%', padding: '20px' }}>
      <h1>Customers</h1>
      
      <div 
        className="ag-theme-alpine" 
        style={{ height: 'calc(100vh - 130px)', width: '100%' }}
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
            resizable: true,
            sortable: true,
            filter: true
          }}
        />
      </div>
    </div>
  );
};