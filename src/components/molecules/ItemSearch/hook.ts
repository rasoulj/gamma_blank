import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetSearchHistory = (options: any = {}) => {
  return useInfiniteQuery(
    ['getSearchHistory', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SEARCH_HISTORY, {
        skip: pageParam * 3,
        take: 3,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.searchHistory_getSearchHistories?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.searchHistory_getSearchHistories?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.searchHistory_getSearchHistories?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetProductsSearch = (options: any = {}) => {
  return useInfiniteQuery(
    ['getProductsSearch', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_PRODUCT, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.ecommerce_getProducts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getProducts?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getProducts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_PRODUCT = gql`
  query ecommerce_getProducts(
    $skip: Int
    $take: Int
    $where: ProductDtoFilterInput
    $order: [ProductDtoSortInput!]
  ) {
    ecommerce_getProducts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          product {
            title
            rateAverage
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }

        totalCount
      }
      status
    }
  }
`;

const GET_SEARCH_HISTORY = gql`
  query searchHistory_getSearchHistories(
    $skip: Int
    $take: Int
    $where: SearchHistoryFilterInput
    $order: [SearchHistorySortInput!]
  ) {
    searchHistory_getSearchHistories() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          type
          value
          userId
        }
        totalCount
      }

      status
    }
  }
`;
export const useGetCategories = key => {
  return useQuery(['getCategories', key], async () => {
    return graphqlFetcher(GET_CATEGORY, key);
  });
};

export const useGetMAXPrice = key => {
  return useQuery(['getmaxprice', key], async () => {
    return graphqlFetcher(GET_MAX_PRICE, key);
  });
};

export const useGetMAXCoursePrice = key => {
  return useQuery(['getmaxCourseprice', key], async () => {
    return graphqlFetcher(GET_MAX_PRICE_COURSE, key);
  });
};

export function useCreateSearchHistory() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_SEARCH_HISTORY, args);
  });
}

const CREATE_SEARCH_HISTORY = gql`
  mutation searchHistory_createSearchHistory($input: SearchHistoryInput!) {
    searchHistory_createSearchHistory(input: $input) {
      result {
        userId
        type
        value
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const GET_MAX_PRICE = gql`
  query ecommerce_getMaxPrice {
    ecommerce_getMaxPrice {
      result {
        data
      }
      status
    }
  }
`;
const GET_CATEGORY = gql`
  query getStaticConfig($key: String!) {
    staticConfig_getStaticConfig(key: $key) {
      status
      result {
        key
        value
        id
      }
    }
  }
`;

const GET_MAX_PRICE_COURSE = gql`
  query course_getMaxPrice {
    course_getMaxPrice {
      result {
        data
      }
      status
    }
  }
`;
