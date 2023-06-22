import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS_QUERY } from './graphql/queries';
import { ProductFilter, ProductGrid } from './components';
import { type Product } from './global/types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { error, data, refetch } = useQuery(
    GET_PRODUCTS_QUERY,
    {
      variables: {
        pageBy: 250,
        cursor: undefined,
      },
    },
  );

  useEffect(() => {
    if (typeof data === 'object') {
      const { products: newProductsData } = data;
      const { nodes: newProducts, pageInfo = {} } = newProductsData;
      const { endCursor, hasNextPage } = pageInfo;

      setProducts((prevState) => [...prevState, ...newProducts]);

      if ((Boolean(hasNextPage)) && (Boolean(endCursor))) {
        refetch({ cursor: endCursor }).catch(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [data, refetch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (typeof error === 'object') {
    return <p>Error: {error.message}</p>;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <ProductFilter
        setFilteredProducts={setFilteredProducts}
        products={products}
      />
      <ProductGrid filteredProducts={filteredProducts} />
    </div>
  );
};

export default App;
