import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '30px', color: 'black', padding: '20px' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '15px', color: 'black', padding: '10px' }}>Something went wrong</p>
      <p style={{ fontSize: '15px', color: 'black', padding: '10px' }}>Try again later</p>
      <Link to='/' style={{ fontSize: '15px', color: 'black', padding: '10px' }}>Back to main page</Link>
    </div>
  );
}
