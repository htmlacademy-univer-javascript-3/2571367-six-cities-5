import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '30px', color: 'black', padding: '21px' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '15px', color: 'black', padding: '11px' }}>Something went wrong</p>
      <p style={{ fontSize: '15px', color: 'black', padding: '11px' }}>Try again later</p>
      <Link to='/' style={{ fontSize: '15px', color: 'black', padding: '10px' }}>Back to main page</Link>
    </div>
  );
}
