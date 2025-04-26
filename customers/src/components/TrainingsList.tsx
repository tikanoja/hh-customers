import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { TrainingWithCustomer } from '../api/types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import dayjs from 'dayjs';

export const TrainingsList = () => {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  
  const fetchTrainings = () => {
    apiClient.get<TrainingWithCustomer[]>('gettrainings')
      .then(res => setTrainings(res))
      .catch(err => console.error('Error fetching trainings:', err));
  };
  
  useEffect(() => {
    fetchTrainings();
  }, []);

  const columnDefs: ColDef[] = [
    { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
    { field: 'duration', headerName: 'Duration (min)', sortable: true, filter: true, width: 150 },
    { 
      field: 'date', 
      headerName: 'Date', 
      sortable: true, 
      filter: true, 
      valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
      sort: 'asc'
    },
    { 
      headerName: 'Customer',
      valueGetter: params => 
        params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : '',
      sortable: true, 
      filter: true 
    }
  ];

  return (
    <div style={{ height: '100%', width: '100%', padding: '20px' }}>
      <h1>Trainings</h1>
      
      <div 
        className="ag-theme-alpine" 
        style={{ height: 'calc(100vh - 130px)', width: '100%' }}
      >
        <AgGridReact
          rowData={trainings}
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
    </div>
  );
};