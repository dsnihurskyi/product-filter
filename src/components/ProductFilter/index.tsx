import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { type Product } from '../../global/types';
import MultiSelect from './MultiSelect';
import PriceRangeSelect from './PriceRangeSelect';

interface ProductFilterProps {
  setFilteredProducts: (filteredProducts: Product[]) => void
  products: Product[]
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  setFilteredProducts,
  products,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [
    filteredProductsAmount,
    setFilteredProductsAmount,
  ] = useState<number>(products.length);

  const availableFilters = useMemo(() => {
    const availableTypes = new Set(
      products.map((product) => product.productType),
    );
    const availablePrices = new Set(
      products.map((product) => (
        Math.ceil(Number(product.priceRange.minVariantPrice.amount))
      )),
    );

    let colorsList: string[] = [];

    products.forEach(product => {
      const colorOption = product.options.find(option => (
        option.name === 'Color'
      ));

      if (colorOption !== undefined) {
        colorsList = colorsList.concat(colorOption.values);
      }
    });

    const availableColors = new Set(colorsList);

    return {
      availablePrices: Array.from(availablePrices),
      availableTypes: Array.from(availableTypes).sort(),
      availableColors: Array.from(availableColors).sort(),
    };
  }, [products]);

  const applyFilters = useCallback(() => {
    const filteredProducts = products.filter((product) => {
      const {
        productType,
        options,
        priceRange: { minVariantPrice, maxVariantPrice },
      } = product;

      if (
        selectedTypes.length > 0
        && !selectedTypes.includes(productType)
      ) {
        return false;
      }

      if (
        selectedPriceRange.length > 0
        && (
          Number(minVariantPrice.amount) > Math.max(...selectedPriceRange)
          || Number(maxVariantPrice.amount) < Math.min(...selectedPriceRange)
        )
      ) {
        return false;
      }

      if (
        selectedColors.length > 0
        && !options.some(option => (
          option.name === 'Color'
          && option.values.some(value => selectedColors.includes(value))
        ))
      ) {
        return false;
      }

      return true;
    });

    setFilteredProductsAmount(filteredProducts.length);
    setFilteredProducts(filteredProducts);
  }, [
    products,
    selectedTypes,
    selectedPriceRange,
    selectedColors,
    setFilteredProducts,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className={`
      p-4
      flex gap-3 items-center flex-wrap
      bg-white
      border-2 border-gray-200 rounded-md
      shadow-sm
    `}>
      <p className='text-lg text-slate-600 font-bold'>Filter:</p>
      <p className='text-base text-slate-400 font-medium sm:order-last'>
        {filteredProductsAmount} products
      </p>
      <div className={`
        w-full sm:w-auto flex flex-col sm:flex-row items-center grow gap-3
      `}>
        <PriceRangeSelect
          availablePrices={availableFilters.availablePrices}
          setSelectedPriceRange={setSelectedPriceRange}
        />
        <MultiSelect
          innerText={'Product type'}
          options={availableFilters.availableTypes}
          selectedOptions={selectedTypes}
          setSelectedOptions={setSelectedTypes}
        />
        <MultiSelect
          innerText={'Color'}
          options={availableFilters.availableColors}
          selectedOptions={selectedColors}
          setSelectedOptions={setSelectedColors}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
