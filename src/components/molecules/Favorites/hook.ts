import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components/elemental';
import useTrackedStates from '../ItemSearch/useStates';

export const useGetFavorites = (options: any = {}) => {
  return useInfiniteQuery(
    ['getFavorites', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_FAVORITES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.favorite_getFavorites?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.favorite_getFavorites?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.favorite_getFavorites?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_FAVORITES = gql`
  query favorite_getFavorites(
    $skip: Int
    $take: Int
    $where: FavoriteFilterInput
    $order: [FavoriteSortInput!]
  ) {
    favorite_getFavorites {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          entityId
          entity {
            id
            title
          }
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
export const useGetFavoriteProducts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getFavoriteProducts', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_FAVORITES_PRODUCT, {
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

export const GET_FAVORITES_PRODUCT = gql`
query ecommerce_getProducts(
  $skip: Int
  $take: Int
  $where: ProductDtoFilterInput
  $order: [ProductDtoSortInput!]
) {
  ecommerce_getProducts {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        isInWishList
        finalPrice
        promotion {
          discount
          id
          
        }
        product {
          productType
          brand
          quality
          ratePercent_1
          ratePercent_2
          ratePercent_3
          ratePercent_4
          ratePercent_5
          subcategory
          productFeatures {
            title
            description
            id
          }
          title
          rateAverage
          rateCount
          price
          pages
          productType
          description
          userId
          user {
            fullName
            photoUrl
            id
          }
          price
          productImages {
            imageUrl
            id
          }
          category
          soldOut
          discount
          id
          createdDate
        }
        isFavorite
        isPurchased
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }

      totalCount
    }
    status
  }
`;
const REMOVE_FAVORITE_EVENT = gql`
  mutation eventAndTicketing_removeFavoriteEvent($eventId: Int!) {
    eventAndTicketing_removeFavoriteEvent(eventId: $eventId) {
      code
      value
      description
    }
  }
`;

const GET_FAVORITE_EVENTS = gql`
  query eventAndTicketing_getFavoriteEvents(
    $skip: Int
    $take: Int
    $where: FavoriteEventFilterInput
    $order: [FavoriteEventSortInput!]
  ) {
    eventAndTicketing_getFavoriteEvents {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          createdDate
          event {
            imageUrl
            title
            city
            date
            endTime
            startTime
            price
            owner {
              fullName
            }
            streetAddress
          }
          eventId
          id
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

export function useRemoveFavoriteEvent() {
  return useMutation(args => {
    return graphqlFetcher(REMOVE_FAVORITE_EVENT, args);
  });
}
export const useGetFavoriteEvents = (options: any = {}) => {
  const keys = ['getFavoriteEvents', options];

  return useInfiniteQuery(
    keys,
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_FAVORITE_EVENTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.eventAndTicketing_getFavoriteEvents?.result?.pageInfo
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
            ?.map(a => a?.eventAndTicketing_getFavoriteEvents?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.eventAndTicketing_getFavoriteEvents?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};
