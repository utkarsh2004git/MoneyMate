import React from "react";

const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false,
  id
}) => {
  return (
    <div>
      {/* Conditionally render the label if one is provided */}
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
    </div>
  );
};

export default InputField;