import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

interface PriceRangeSelectProps {
  availablePrices: number[]
  setSelectedPriceRange: (newPriceRange: number[]) => void
}

const PriceRangeSelect: React.FC<PriceRangeSelectProps> = ({
  availablePrices,
  setSelectedPriceRange,
}) => {
  const step = 10;
  const priceCap = 200;
  const min = Math.min(...availablePrices);
  const max = Math.max(...availablePrices) + step;
  const rangeBaseStyle = `
    absolute w-full -top-1 h-1
    bg-transparent appearance-none pointer-events-none
  `;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < maxValue) {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > minValue) {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  const handleResetRange = (): void => {
    setMinValue(min);
    setMaxValue(max);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedPriceRange([minValue, maxValue]);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [minValue, maxValue, setSelectedPriceRange]);

  return (
    <CustomSelect
      buttonText={'Price'}
      handleReset={handleResetRange}
      menuHeadline={`${minValue} - ${maxValue}`}
      menuContent={
        <div className='my-4'>
          <div className='slider relative h-1 rounded-md bg-gray-300'>
          </div>

          <div className='range-input relative  '>
            <input
              onChange={handleMin}
              type='range'
              min={min}
              step={step}
              max={max}
              value={minValue}
              className={`range-min ${rangeBaseStyle}`}
            />

            <input
              onChange={handleMax}
              type='range'
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className={`range-max ${rangeBaseStyle}`}
            />
          </div>
        </div>
      }
    />
  );
};

export default PriceRangeSelect;
