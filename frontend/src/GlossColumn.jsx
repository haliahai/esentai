import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import GlossList from './GlossList';

const GlossColumn = ({
  label,
  longLabel,
  lang,
  partOfSpeech,
  gloss,
  comment,
  selectedGloss,
  onLangChange,
  onGlossChange,
  onGlossSelect,
  onCommentChange
}) => {

  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFieldValid, setIsSearchFieldValid] = useState(false);

  useEffect(() => {
    setIsSearchFieldValid(gloss.length > 0 && lang.length > 0 && partOfSpeech.length > 0);
  }, [gloss, lang, partOfSpeech]);

  const handleSearch = async (query) => {
    fetch(`/api/v1/get/glosses?q=${gloss}&lang=${lang}&pos=${partOfSpeech}&limit=10`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Get glosses, response: ${JSON.stringify(data)}`);
      setSearchResults(data.glosses);
    });
  };

  const handleAddNewGloss = () => {
    fetch(`/api/v1/create/gloss?text=${gloss}&comment=${comment}&lang=${lang}&pos=${partOfSpeech}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      selectedGloss = data;
      onGlossSelect(data);
      console.log(`Create gloss, response: ${JSON.stringify(data)}`);
      console.log(`SelectedGlossId: ${JSON.stringify(selectedGloss)}`);
    });
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
          <option value="kk">Kazakh</option>
          <option value="en">English</option>
          <option value="ru">Russian</option>
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
            className={`ml-2 mt-1 bg-blue-500 text-white font-bold py-2 px-4 rounded ${!isSearchFieldValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isSearchFieldValid}
          >
            Search
          </button>
        </div>
      </FormSection>

      <FormSection label={`Select a gloss or add a new one`}>
        <GlossList
          label={label}
          glosses={searchResults}
          selectedGloss={selectedGloss}
          comment={comment}
          onGlossSelect={onGlossSelect}
          onCommentChange={onCommentChange}
          onAddNewGloss={handleAddNewGloss}
        />
      </FormSection>
    </div>
  );
};

export default GlossColumn;
