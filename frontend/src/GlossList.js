import React from 'react';

const GlossList = ({
  glosses,
  selectedGloss,
  onGlossSelect,
  onAddNewGloss
}) => {
  return (
    <div className="border p-2 rounded-md">
      <ul>
        {glosses.map((item, index) => (
          <li key={index}
              className={`p-2 cursor-pointer ${selectedGloss === item ? 'bg-blue-100' : ''}`}
              onClick={() => onGlossSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <button
          onClick={onAddNewGloss}
          className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Add New
        </button>
      </div>
    </div>
  );
};

export default GlossList;
