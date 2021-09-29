import React, {FunctionComponent, useEffect, useState} from 'react';

export interface Props {
  onClick: (_: number) => void;
  onReset: () => void;
}


const IdentifierInput: FunctionComponent<Props> = ({ onClick, onReset }) => {

  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numbers = [0 ,1, 2, 3, 4, 5, 6, 7, 8, 9];
    setShuffledNumbers(numbers.sort((a, b) => 0.5 - Math.random()));
  }, []);

  return (
    <div className='flex flex-row flex-wrap'>
      { shuffledNumbers.map((number) => (
        <button
          className="bg-white border border-2 border-gray-400 h-16 w-16 text-lg m-2 shadow-md"
          onClick={() => onClick(number)}
          key={number}
          type="button"
        >
          {number.toString()}
        </button>
      ))}
      <button
        className="bg-white border border-2 border-gray-400 h-16 w-16 text-lg m-2 shadow-md"
        onClick={onReset}
        type="button"
      >
        X
      </button>
    </div>
  );
}

export default IdentifierInput;
