import { gql } from '@apollo/client';

const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on Product {
    id
    title
    handle
    productType
    options {
      name
      values
      id
    }
    priceRange {
      minVariantPrice {
        amount
      }
      maxVariantPrice {
        amount
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $pageBy: Int!
    $cursor: String
  ) {
    products(first: $pageBy, after: $cursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
