import React, { useState, useEffect } from 'react';
import GlossColumn from './GlossColumn';

const CreateLinkForm = () => {
  const [formData, setFormData] = useState({
    srcLang: '',
    dstLang: '',
    partOfSpeech: '',
    srcGloss: '',
    dstGloss: '',
    selectedSrcGloss: '',
    selectedDstGloss: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validate());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = async (query) => {
    // Simulate an API call to fetch search results
    return ["example1", "example2", "example3"].filter(item => !item.includes(query));
  };

  const handleSelectSrcGloss = (gloss) => {
    setFormData({
      ...formData,
      selectedSrcGloss: gloss
    });
  };

  const handleSelectDstGloss = (gloss) => {
    setFormData({
      ...formData,
      selectedDstGloss: gloss
    });
  };

  const handleAddNewSrcGloss = () => {
    console.log('Add new src gloss');
  };

  const handleAddNewDstGloss = () => {
    console.log('Add new dst gloss');
  };

  const validate = () => {
    const errors = {};
    if (!formData.srcLang) errors.srcLang = 'Source language is required';
    if (!formData.dstLang) errors.dstLang = 'Destination language is required';
    if (!formData.partOfSpeech) errors.partOfSpeech = 'Part of speech is required';
    if (!formData.srcGloss) errors.srcGloss = 'Source gloss is required';
    if (!formData.dstGloss) errors.dstGloss = 'Destination gloss is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    // Handle form submission
    console.log('Form submitted', formData);
  };

  const handleReset = () => {
    setFormData({
      srcLang: '',
      dstLang: '',
      partOfSpeech: '',
      srcGloss: '',
      dstGloss: '',
      selectedSrcGloss: '',
      selectedDstGloss: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Part of speech</label>
          <select
            id="partOfSpeech"
            name="partOfSpeech"
            value={formData.partOfSpeech}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select part of speech</option>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column - Source Language */}
          <GlossColumn
            label="src"
            longLabel="Source"
            lang={formData.srcLang}
            gloss={formData.srcGloss}
            selectedGloss={formData.selectedSrcGloss}
            onLangChange={handleChange}
            onGlossChange={handleChange}
            onSearch={handleSearch}
            onGlossSelect={handleSelectSrcGloss}
            onAddNewGloss={handleAddNewSrcGloss}
          />

          {/* Right Column - Destination Language */}
          <GlossColumn
            label="dst"
            longLabel="Destination"
            lang={formData.dstLang}
            gloss={formData.dstGloss}
            selectedGloss={formData.selectedDstGloss}
            onLangChange={handleChange}
            onGlossChange={handleChange}
            onSearch={handleSearch}
            onGlossSelect={handleSelectDstGloss}
            onAddNewGloss={handleAddNewDstGloss}
          />
        </div>

        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLinkForm;
