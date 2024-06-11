import React from 'react';
import { useState, useEffect } from 'react';
import FormSection from './FormSection';

const SearchLinksForm = () => {

  const [gloss, setGloss] = useState('');
  const [srcLang, setSrcLang] = useState('');
  const [dstLang, setDstLang] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setIsFormValid(gloss.length > 0 && srcLang.length > 0 && dstLang.length > 0);
  }, [gloss, srcLang, dstLang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'gloss') {
      setGloss(value);
    } else if (name === 'srcLang') {
       setSrcLang(value);
     }
    else if (name === 'dstLang') {
      setDstLang(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Search gloss: ${gloss}, srcLang: ${srcLang}, dstLang: ${dstLang}`);
  }

  const handleSearch = () => {
    fetch(`/api/v1/get/links?q=${gloss}&src=${srcLang}&dst=${dstLang}&limit=10`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Get links, response: ${JSON.stringify(data)}`);
      setSearchResults(data.links);
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <FormSection label="Source language">
                <select
                  id="srcLang"
                  name="srcLang"
                  value={srcLang}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select language</option>
                  <option value="kk">Kazakh</option>
                  <option value="en">English</option>
                  <option value="ru">Russian</option>
                </select>
              </FormSection>
              <FormSection label="Destination language">
                <select
                  id="dstLang"
                  name="dstLang"
                  value={dstLang}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select language</option>
                  <option value="kk">Kazakh</option>
                  <option value="en">English</option>
                  <option value="ru">Russian</option>
                </select>
              </FormSection>
            </div>
            <FormSection label="Gloss">
              <div className="flex items-center">
                <input
                  type="text"
                  id="gloss"
                  name="gloss"
                  value={gloss}
                  onChange={handleChange}
                  className="transition-all duration-300 ease-in-out w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Search gloss"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className={`ml-2 mt-1 bg-blue-500 text-white font-bold py-2 px-4 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isFormValid}
                >
                  Search
                </button>
              </div>
            </FormSection>

            <FormSection label="Translations">
              <ul>
                {searchResults.map((item, index) => (
                  <li key={index} className="p-2 cursor-pointer">
                    {item.dstGloss}
                  </li>
                ))}
              </ul>
            </FormSection>
          </form>
        </div>
  );
};

export default SearchLinksForm;
