import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  label = '',
  className
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      {label && <label>{label}</label>}
      <input
        aria-label="Search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
};

export default Input;