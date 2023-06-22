import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectOptions {
  buttonText: string
  menuHeadline: string
  menuContent: React.ReactNode
  handleReset: () => void
}

const CustomSelect: React.FC<CustomSelectOptions> = ({
  buttonText,
  menuHeadline,
  menuContent,
  handleReset,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      if (
        dropdownRef.current !== null
        && buttonRef.current !== null
        && !dropdownRef.current.contains(e.target as Node)
        && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleButtonClick = (): void => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='relative w-full sm:w-fit'>
      <button
        ref={buttonRef}
        type='button'
        className={`
          w-full px-4 py-2
          text-left
          bg-neutral-50
          border-2 border-neutral-300 rounded-md
          shadow-sm
          transition
          focus:outline-none
          hover:ring-2 hover:ring-blue-500
        `}
        onClick={handleButtonClick}
      >
        <div className='flex items-center justify-between gap-2'>
          <span className='text-base font-medium text-slate-500'>
            {buttonText}
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 text-base text-slate-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </svg>
        </div>
      </button>
      <div
        ref={dropdownRef}
        className={`
          ${isOpen ? 'scale-100' : 'scale-0'}
          absolute z-10 mt-2
          w-full sm:w-72
          bg-white
          border border-neutral-300 rounded-md
          shadow-sm
          overflow-hidden
          transition
        `}
      >
        <div className={`
          p-4 flex items-center justify-between gap-2 bg-neutral-50
        `}>
          <span className='text-base font-medium text-slate-500'>
            {menuHeadline}
          </span>
          <button
            type='button'
            className='font-medium text-slate-500'
            onClick={handleReset}
          >
            <span className='text-base underline decoration-solid'>Reset</span>
          </button>
        </div>
        <div className='p-4'>
          {menuContent}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
