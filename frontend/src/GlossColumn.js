import React, { useState } from 'react';
import FormSection from './FormSection';

const GlossColumn = ({
  label,
  longLabel,
  lang,
  gloss,
  onLangChange,
  onGlossChange,
  onSearch
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (gloss.trim() === "") {
      setIsExpanded(false);
    }
  };

  const handleSearch = async () => {
    const results = await onSearch(gloss);
    setSearchResults(results);
  };

  const handleResultSelect = (result) => {
    onGlossChange({ target: { name: `${label.toLowerCase()}Gloss`, value: result } });
    setSearchResults([]);
  };

  return (
    <div>
      <FormSection label={`${longLabel} language`}>
        <select
          id={`${label}Lang`}
          name={`${label}Lang`}
          value={lang}
          onChange={onLangChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">{`Select ${longLabel.toLowerCase()} language`}</option>
          <option value="kazakh">Kazakh</option>
          <option value="english">English</option>
          <option value="russian">Russian</option>
        </select>
      </FormSection>

      <FormSection label={`${longLabel} gloss`}>
        <div className="flex items-center">
          <input
            type="text"
            id={`${label.toLowerCase()}Gloss`}
            name={`${label.toLowerCase()}Gloss`}
            value={gloss}
            onChange={onGlossChange}
            onFocus={handleExpand}
            onBlur={handleBlur}
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'w-full' : 'w-32'
            } mt-1 p-2 border border-gray-300 rounded-md`}
            placeholder="Search gloss"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="ml-2 mt-1 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onMouseDown={() => handleResultSelect(result)}
              >
                {result}
              </li>
            ))}
          </ul>
        )}
      </FormSection>
    </div>
  );
};

export default GlossColumn;
