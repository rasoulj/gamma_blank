import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components/elemental';




export const useGetEventCategories = (options: any = {}) => {
  const keys = ['getEventCategories', options];

  return useInfiniteQuery(
    keys,
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_EVENT_CATEGORIES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (
          lastPage?.eventAndTicketing_getEventCategories?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.eventAndTicketing_getEventCategories?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.eventAndTicketing_getEventCategories?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetProductCategories = (options: any = {}) => {
    const keys = ['getProductCategories', options];
  
    return useInfiniteQuery(
      keys,
      async ({pageParam = 0}) => {
        return graphqlFetcher(GET_EVENT_CATEGORIES, {
          skip: pageParam * 10,
          take: 10,
          ...options,
        });
      },
      {
        getNextPageParam: (lastPage, allPages: []) => {
          if (
            lastPage?.ecommerceCategory_getCategories?.result?.pageInfo
              ?.hasNextPage
          ) {
            return allPages.length;
          }
          return undefined;
        },
        select: data => {
          return {
            ...data,
            pages: data?.pages
              ?.map(a => a?.ecommerceCategory_getCategories?.result?.items)
              .flat(),
            totalCount:
              data?.pages?.[0]?.ecommerceCategory_getCategories?.result
                ?.totalCount,
          };
        },
        ...options,
      },
    );
  };

const GET_EVENT_CATEGORIES = gql`
query eventAndTicketing_getEventCategories (
    $skip: Int
    $take: Int
    $where: EventCategoryFilterInput
    $order: [EventCategorySortInput!]
  ){
    eventAndTicketing_getEventCategories {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items{
          id
          createdDate
          name
          photoUrl
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;

const GET_PRODUCT_CATEGORIES = gql`
query ecommerceCategory_getCategories(
    $skip: Int
    $take: Int
    $where: ProductCategoryFilterInput
    $order: [ProductCategorySortInput!]
  ){
    ecommerceCategory_getCategories {
      result(skip: $skip, take: $take, where: $where, order: $order){
        items{
          categoryName
          createdDate
          id
          imageUrl
          title
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;