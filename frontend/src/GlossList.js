import React from 'react';

const GlossList = ({ glosses, selectedGloss, onSelectGloss, newGloss, onAddNewGloss }) => {
  return (
    <div className="border p-2 rounded-md">
      <ul>
        {glosses.map((item, index) => (
          <li key={index} className="p-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gloss"
                value={item}
                checked={selectedGloss === item}
                onChange={() => onSelectGloss(item)}
                className="mr-2"
              />
              {item}
            </label>
          </li>
        ))}
        <li className="p-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gloss"
              value={newGloss}
              checked={selectedGloss === newGloss}
              onChange={onAddNewGloss}
              className="mr-2"
            />
            Add a new gloss
          </label>
        </li>
      </ul>
    </div>
  );
};

export default GlossList;
