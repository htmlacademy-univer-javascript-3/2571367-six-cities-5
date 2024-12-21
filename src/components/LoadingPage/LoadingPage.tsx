import './spinner.css';
function LoadingPage(): JSX.Element {
  return (
    <div className="spinner-overlay" data-testid="spinner-container">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
}

export default LoadingPage;
