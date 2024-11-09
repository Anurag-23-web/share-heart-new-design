import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" >
      <div className="spinner-border" style={{ width: '3rem', height: '3rem', borderWidth: '0.4rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
