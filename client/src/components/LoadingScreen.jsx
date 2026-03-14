const LoadingScreen = ({ inline = false }) => {
  const shellClass = inline
    ? 'h-[32vh] rounded-2xl border border-[#E7D9BA] bg-white'
    : 'fixed inset-0 z-[9999] bg-white';

  return (
    <div className={`${shellClass} flex items-center justify-center`}>
      <div className={`ball-loader${inline ? ' ball-loader--small' : ''}`} role="status" aria-label="Loading" />
    </div>
  );
};

export default LoadingScreen;
