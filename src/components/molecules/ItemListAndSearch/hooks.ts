import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetItems = (options: any = {}) => {
  return useInfiniteQuery(
    ['getSearchItems', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ITEMS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (lastPage?.ecommerce_getItems?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getItems?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.ecommerce_getItems?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ITEMS = gql`
  query ecommerce_getItems(
    $skip: Int
    $take: Int
    $where: ItemFilterInput
    $order: [ItemSortInput!]
  ) {
    ecommerce_getItems {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          description
          imageUrl
          quantity
          id
          createdDate
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
