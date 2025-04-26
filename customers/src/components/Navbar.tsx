import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
      <Link to="/customers" style={{ marginRight: '1rem' }}>Customers</Link>
      <Link to="/trainings">Trainings</Link>
    </nav>
  );
};
