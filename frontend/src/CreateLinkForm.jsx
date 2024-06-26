import React, { useState, useEffect } from 'react';
import GlossColumn from './GlossColumn';

const CreateLinkForm = () => {
  const initialState = {
    partOfSpeech: 'noun',
    srcLang: 'kk',
    srcGloss: '',
    selectedSrcGloss: '',
    srcComment: '',
    dstLang: 'ru',
    dstGloss: '',
    selectedDstGloss: '',
    dstComment: ''
  };

  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validate());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectSrcGloss = (g) => {
      setFormData({
        ...formData,
        selectedSrcGloss: g
      });
    };

    const handleSelectDstGloss = (g) => {
      setFormData({
        ...formData,
        selectedDstGloss: g
      });
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

    fetch(`/api/v1/create/link?src=${formData.srcLang}&dst=${formData.dstLang}&srcGloss=${formData.selectedSrcGloss.id}&dstGloss=${formData.selectedDstGloss.id}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Form submitted: ', formData);
      console.log(`Create link, response: ${JSON.stringify(data)}`);
      handleReset();
    });
  };

  const handleReset = () => {
    setFormData(initialState);
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
            <option value="adjective">Adjective</option>
            <option value="adverb">Adverb</option>
            <option value="pronoun">Pronoun</option>
            <option value="preposition">Preposition</option>
            <option value="conjunction">Conjunction</option>
            <option value="interjection">Interjection</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column - Source Language */}
          <GlossColumn
            label="src"
            longLabel="Source"
            lang={formData.srcLang}
            partOfSpeech={formData.partOfSpeech}
            gloss={formData.srcGloss}
            comment={formData.srcComment}
            selectedGloss={formData.selectedSrcGloss}
            onLangChange={handleChange}
            onGlossChange={handleChange}
            onGlossSelect={handleSelectSrcGloss}
            onCommentChange={handleChange}
          />

          {/* Right Column - Destination Language */}
          <GlossColumn
            label="dst"
            longLabel="Destination"
            lang={formData.dstLang}
            partOfSpeech={formData.partOfSpeech}
            gloss={formData.dstGloss}
            comment={formData.dstComment}
            selectedGloss={formData.selectedDstGloss}
            onLangChange={handleChange}
            onGlossChange={handleChange}
            onGlossSelect={handleSelectDstGloss}
            onCommentChange={handleChange}
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
