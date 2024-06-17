import React from 'react';

const FormSection = ({ label, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      {children}
    </div>
  );
};

export default FormSection;
