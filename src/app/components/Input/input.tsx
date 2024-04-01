import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  label = '',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        aria-label="Search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;