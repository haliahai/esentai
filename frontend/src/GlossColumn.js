import React, { useState } from 'react';
import FormSection from './FormSection';
import GlossList from './GlossList';

const GlossColumn = ({
  label,
  longLabel,
  lang,
  gloss,
  onLangChange,
  onGlossChange,
  onSearch
}) => {
  const [localGlosses, setLocalGlosses] = useState([]);
  const [selectedGloss, setSelectedGloss] = useState('');

  const handleSearch = () => {
//    onSearch(gloss);
    // Mock search result
    setLocalGlosses(['example1', 'example2', 'example3']);
  };

  const handleSelectGloss = (selectedGloss) => {
    setSelectedGloss(selectedGloss);
  };

  const handleAddNewGloss = () => {
    setSelectedGloss(gloss);
    setLocalGlosses([...localGlosses, gloss]);
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
        <div className="flex">
          <input
            type="text"
            id={`${label.toLowerCase()}Gloss`}
            name={`${label.toLowerCase()}Gloss`}
            value={gloss}
            onChange={onGlossChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
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
      </FormSection>

      <FormSection label={`Select a gloss or add a new one`}>
        <GlossList
          glosses={localGlosses}
          selectedGloss={selectedGloss}
          onSelectGloss={handleSelectGloss}
          newGloss={gloss}
          onAddNewGloss={handleAddNewGloss}
        />
      </FormSection>
    </div>
  );
};

export default GlossColumn;
