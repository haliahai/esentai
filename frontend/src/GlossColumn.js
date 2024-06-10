import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import GlossList from './GlossList';

const GlossColumn = ({
  label,
  longLabel,
  lang,
  gloss,
  selectedGloss,
  onLangChange,
  onGlossChange,
  onSearch,
  onGlossSelect,
  onAddNewGloss
}) => {

  const [searchResults, setSearchResults] = useState([]);
  const [newGloss, setNewGloss] = useState('');
  const [isSearchFieldValid, setIsSearchFieldValid] = useState(false);

  useEffect(() => {
    setIsSearchFieldValid(gloss.length > 0);
  }, [gloss]);

  const handleSearch = async (query) => {
    // Simulate an API call to fetch search results
    const results = ["example1", "example2", "example3"];
    setSearchResults(results);
  };

  const handleNewGlossChange = (value) => {
    setNewGloss(value);
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
            className="transition-all duration-300 ease-in-out w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Search gloss"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="ml-2 mt-1 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={!isSearchFieldValid}
          >
            Search
          </button>
        </div>
      </FormSection>

      <FormSection label={`Select a gloss or add a new one`}>
        <GlossList
          glosses={searchResults}
          selectedGloss={selectedGloss}
          onGlossSelect={onGlossSelect}
          onAddNewGloss={onAddNewGloss}
        />
      </FormSection>
    </div>
  );
};

export default GlossColumn;
