import React, { useState } from 'react';
import CreateLinkForm from './CreateLinkForm';
import SearchLinksForm from './SearchLinksForm';
import ProfileButton from './ProfileButton';

const App = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-semibold text-gray-900">Kazateka</span>
              </div>
              <div className="ml-10 flex items-center">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'create' ? 'text-white bg-blue-500' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('create')}
                >
                  Create Link
                </button>
                <button
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'search' ? 'text-white bg-blue-500' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('search')}
                >
                  Search Links
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <ProfileButton />
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'create' ? <CreateLinkForm /> : <SearchLinksForm />}
      </div>
    </div>
  );
};

export default App;
