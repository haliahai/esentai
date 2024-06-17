import React from 'react';
import { useState, useEffect } from 'react';

const GlossList = ({
  label,
  glosses,
  selectedGloss,
  comment,
  onGlossSelect,
  onCommentChange,
  onAddNewGloss
}) => {

  const[isCommentValid, setIsCommentValid] = useState(false);

  useEffect(() => {
    setIsCommentValid(comment.length > 0);
  }, [comment]);

  return (
    <div className="border p-2 rounded-md">
      <ul>
        {glosses.map((item, index) => (
          <li key={index}
              className={`p-2 cursor-pointer ${selectedGloss && selectedGloss.id === item.id ? 'bg-blue-100' : ''}`}
              onClick={() => onGlossSelect(item)}
          >
            {item.comment}
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <input
          type="text"
          id={`${label.toLowerCase()}Comment`}
          name={`${label.toLowerCase()}Comment`}
          value={comment}
          onChange={onCommentChange}
          className="transition-all duration-300 ease-in-out w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Comment"
        />
        <button
          type="button"
          onClick={() => onAddNewGloss()}
          className={`ml-2 mt-1 bg-blue-500 text-white font-bold py-2 px-4 rounded ${!isCommentValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Add New
        </button>
      </div>
    </div>
  );
};

export default GlossList;
