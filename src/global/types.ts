interface ProductOption {
  name: string
  values: string[]
  id: string
}

export interface Product {
  id: string
  title: string
  handle: string
  productType: string
  options: ProductOption[]
  priceRange: {
    minVariantPrice: {
      amount: string
    }
    maxVariantPrice: {
      amount: string
    }
  }
}
