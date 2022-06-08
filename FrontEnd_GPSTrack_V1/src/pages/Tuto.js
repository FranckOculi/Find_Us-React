import React, { useState } from 'react';
import Sequence1 from '../components/tuto/Sequence1';
import Sequence2 from '../components/tuto/Sequence2';
import UseAuth from '../hooks/UseAuth';

const Tuto = () => {
  const [state1, setState1] = useState(true);
  const [state2, setState2] = useState(false);
  const { changeTutoStatus } = UseAuth();

  const handleChangeStatus = () => {
    changeTutoStatus();
  };

  if (state1) {
    return (
      <div className='tuto'>
        <Sequence1 setState1={setState1} setState2={setState2} />
      </div>
    );
  }

  if (state2) {
    return (
      <div className='tuto'>
        <Sequence2
          setState1={setState2}
          handleChangeStatus={handleChangeStatus}
        />
      </div>
    );
  }

  return <div className='tuto'>Bonjour !</div>;
};

export default Tuto;
