import React from 'react';
import ReactLoading from 'react-loading';
const Loader = () => {
  return (
    <div id='loader'>
      <ReactLoading type='bars' color='rgb(176, 176, 176)' />
    </div>
  );
};

export default Loader;
