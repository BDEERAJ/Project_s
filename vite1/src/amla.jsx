import { useContext } from 'react';
import { UserContext } from './App'; // Match the name you exported

const A = () => {
  const value = useContext(UserContext);

  return (
    <>
      I'm in A, context value: {value}
    </>
  );
};

export default A;
