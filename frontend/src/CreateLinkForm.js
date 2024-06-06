import React, { useState } from 'react';
import GlossColumn from './GlossColumn';

const CreateLinkForm = () => {
  const [formData, setFormData] = useState({
    srcLang: '',
    dstLang: '',
    partOfSpeech: '',
    srcGloss: '',
    dstGloss: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your form submission logic here
  };

  const handleReset = () => {
    setFormData({
      srcLang: '',
      dstLang: '',
      partOfSpeech: '',
      srcGloss: '',
      dstGloss: '',
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
            onLangChange={handleChange}
            onGlossChange={handleChange}
            onSearch={handleSearch}
          />

          {/* Right Column - Destination Language */}
          <GlossColumn
            label="dst"
            longLabel="Destination"
            lang={formData.dstLang}
            gloss={formData.dstGloss}
            onLangChange={handleChange}
            onGlossChange={handleChange}
            onSearch={handleSearch}
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
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLinkForm;
