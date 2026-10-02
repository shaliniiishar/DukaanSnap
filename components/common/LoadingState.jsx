const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="loading-state">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingState;