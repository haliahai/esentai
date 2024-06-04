import React, { useState } from 'react';

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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="srcLang">
            Source language
          </label>
          <select
            id="srcLang"
            name="srcLang"
            value={formData.srcLang}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select source language</option>
            <option value="kazakh">Kazakh</option>
            <option value="english">English</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dstLang">
            Destination language
          </label>
          <select
            id="dstLang"
            name="dstLang"
            value={formData.dstLang}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select destination language</option>
            <option value="kazakh">Kazakh</option>
            <option value="english">English</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partOfSpeech">
            Part of speech
          </label>
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="srcGloss">
            Kazakh gloss
          </label>
          <input
            type="text"
            id="srcGloss"
            name="srcGloss"
            value={formData.srcGloss}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Search Kazakh gloss"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dstGloss">
            English gloss
          </label>
          <input
            type="text"
            id="dstGloss"
            name="dstGloss"
            value={formData.dstGloss}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Search English gloss"
          />
        </div>

        <div className="flex justify-between items-center">
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
