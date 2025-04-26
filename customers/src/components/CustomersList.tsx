import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Customer } from '../api/types';

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    apiClient.get<{ _embedded: { customers: Customer[] } }>('customers')
      .then(res => setCustomers(res._embedded.customers));
  }, []);

  const filtered = customers.filter(c =>
    (c.firstname + ' ' + c.lastname).toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const nameA = a.firstname.toLowerCase();
    const nameB = b.firstname.toLowerCase();
    return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  return (
    <div>
      <h1>Customers</h1>
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort {sortAsc ? '↓' : '↑'}
      </button>
      <table border={1} cellPadding={5} style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, idx) => (
            <tr key={idx}>
              <td>{c.firstname}</td>
              <td>{c.lastname}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
