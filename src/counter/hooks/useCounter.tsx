import { useState } from 'react';

const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleSubtract = () => {
    setCounter((prevState) => prevState - 1);
  };

  const handleReset = () => {
    setCounter(initialValue);
  };

  return {
    // Properties/Values
    counter,

    // Methods/Actions
    handleAdd,
    handleSubtract,
    handleReset,
  };
};

export { useCounter };
