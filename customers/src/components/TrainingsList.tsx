import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { TrainingWithCustomer } from '../api/types';
import dayjs from 'dayjs';

export const TrainingsList = () => {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    apiClient.get<TrainingWithCustomer[]>('gettrainings')
      .then(res => setTrainings(res));
  }, []);

  const filtered = trainings.filter(t =>
    t.activity.toLowerCase().includes(search.toLowerCase()) ||
    (t.customer.firstname + ' ' + t.customer.lastname).toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    return sortAsc
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <h1>Trainings</h1>
      <input 
        type="text" 
        placeholder="Search by activity or customer..." 
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort {sortAsc ? '↓' : '↑'}
      </button>
      <table border={1} cellPadding={5} style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Duration (min)</th>
            <th>Date</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t, idx) => (
            <tr key={idx}>
              <td>{t.activity}</td>
              <td>{t.duration}</td>
              <td>{dayjs(t.date).format('DD.MM.YYYY HH:mm')}</td>
              <td>{t.customer.firstname} {t.customer.lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
