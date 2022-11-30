import React from 'react';
interface InputFormProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  value: string;
  placeHolder: string;
  className?: string;
  type?: string;
}
const InputForm = ({
  value,
  onChange,
  placeHolder,
  className,
  type,
}: InputFormProps) => {
  return (
    <input
      type={type ? type : 'text'}
      className={`bg-zinc-100 py-4 px-5 ${className}`}
      placeholder={placeHolder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InputForm;
