import '../../../markup/css/spinner.css';
function LoadingScreen(): JSX.Element {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingScreen;
