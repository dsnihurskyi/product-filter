import React from 'react';
import CustomSelect from './CustomSelect';

interface MultiSelectOptions {
  innerText: string
  options: string[]
  selectedOptions: string[]
  setSelectedOptions: (newOptions: string[]) => void
}

const MultiSelect: React.FC<MultiSelectOptions> = ({
  innerText,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const toggleOption = (option: string): void => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleResetOptions = (): void => {
    setSelectedOptions([]);
  };

  return (
    <CustomSelect
      buttonText={innerText}
      handleReset={handleResetOptions}
      menuHeadline={`${selectedOptions.length} selected`}
      menuContent={
        <ul className='flex flex-col gap-4'>
          {options.map((option) => (
            <li
              key={option}
              className={`
                transition text-left cursor-pointer font-medium hover:text-black
                ${selectedOptions.includes(option) ? 'text-black' : 'text-slate-400'}
              `}
              onClick={() => {
                toggleOption(option);
              }}
            >
              <span className="text-base">{option}</span>
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default MultiSelect;
