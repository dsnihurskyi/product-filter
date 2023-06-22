import React from 'react';
import { type Product } from '../../global/types';

interface ProductGridProps {
  filteredProducts: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ filteredProducts }) => {
  const getPriceRangeLabel = ({ priceRange }: Product): string => {
    const { maxVariantPrice, minVariantPrice } = priceRange;

    if (maxVariantPrice.amount === minVariantPrice.amount) {
      return maxVariantPrice.amount;
    }

    return `${minVariantPrice.amount} - ${maxVariantPrice.amount}`;
  };

  const getProductColorsLabel = ({ options }: Product): string => {
    const currentColorOption = options.find(option => option.name === 'Color');

    if (currentColorOption !== undefined) {
      return currentColorOption.values.join(', ');
    }

    return 'NONE';
  };

  return (
    <div className={`
      mt-4
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      gap-2 md:gap-4
    `}>
      {filteredProducts.length > 0
        ? (filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p>Type: {product.productType}</p>
              <p>Price: {getPriceRangeLabel(product)}</p>
              <p>Colors: {getProductColorsLabel(product)}</p>
            </div>
          )))
        : <p>No products match your filters</p>
      }
    </div>
  );
};

export default ProductGrid;
