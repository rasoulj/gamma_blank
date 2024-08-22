import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';
import useTrackedStates from '../../molecules/ItemSearch/useStates';

export const useGetEvents = (options: any = {}) => {
  const {setCityState, filters} = useTrackedStates();
  const keys = ['getEvents', options];

  return useInfiniteQuery(
    keys,
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_EVENTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      onSuccess: data => {
        const states = data?.pages?.map(item => {
          return {
            city: item?.event?.city,
            state: item?.event?.state,
          };
        });
        setCityState(states);
      },
      getNextPageParam: (lastPage, allPages: []) => {
        if (
          lastPage?.eventAndTicketing_getEvents?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.eventAndTicketing_getEvents?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.eventAndTicketing_getEvents?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useDisLikeEvent() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_EVENT_LIKE, args);
  });
}

export function useLikeEvent() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_EVENT_LIKE, args);
  });
}

export const useGetRatingRate = (options: any = {}) => {
  return useInfiniteQuery(
    ['getRatings', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_RATINGS_RATE, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.rating_getRatings?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.rating_getRatings?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.rating_getRatings?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useCreateViolationReport() {
  return useMutation((args: any) => {
    return graphqlFetcher(VIOLATION_REPORT, args);
  });
}

export function useRemoveRate() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_RATE, args);
  });
}

export function useDeleteEvent() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_EVENT, args);
  });
}

export function useUpdateEvent() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_EVENT, args);
  });
}

export const useGetTotalRate = args => {
  return useQuery(['getTotalRate', args], async () => {
    return graphqlFetcher(GET_TOTAL_RATE, args);
  });
};

const GET_TOTAL_RATE = gql`
  query rating_getTotalRate($targetEntityName: String!, $targetEntityId: Int!) {
    rating_getTotalRate(
      targetEntityName: $targetEntityName
      targetEntityId: $targetEntityId
    ) {
      result {
        totalCount
        average
        rateByUser
      }
      status
    }
  }
`;
const UPDATE_EVENT = gql`
  mutation eventAndTicketing_updateEvent($input: EventInput!) {
    eventAndTicketing_updateEvent(input: $input) {
      result {
        title
        imageUrl
        ownerId
        eventTypeId
        description
        date
        startTime
        endTime
        price
        currency
        state
        capacity
        participantsCount
        isActive
        city
        streetAddress
        zipCode
        category
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
const DELETE_EVENT = gql`
  mutation eventAndTicketing_removeEvent($eventId: Int!) {
    eventAndTicketing_removeEvent(eventId: $eventId) {
      code
      value
      description
    }
  }
`;

const ADD_EVENT_LIKE = gql`
  mutation ($eventId: Int!) {
    eventAndTicketing_createFavoriteEvent(eventId: $eventId) {
      status
    }
  }
`;
const REMOVE_EVENT_LIKE = gql`
  mutation ($eventId: Int!) {
    eventAndTicketing_removeFavoriteEvent(eventId: $eventId) {
      code
      value
    }
  }
`;
export const GET_ALL_EVENTS = gql`
  query eventAndTicketing_getEvents(
    $skip: Int
    $take: Int
    $where: EventDtoFilterInput
    $order: [EventDtoSortInput!]
  ) {
    eventAndTicketing_getEvents {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          event {
            id
            title
            imageUrl
            ownerId
            streetAddress
            owner {
              fullName
              photoUrl
            }
            description
            category
            date
            startTime
            endTime
            zipCode
            price
            currency
            isActive
            capacity
            participantsCount
            createdDate
            city
            state
            tickets {
              participant {
                fullName
                photoUrl
              }
            }
          }
          isFavorite
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

const GET_RATINGS_RATE = gql`
  query rating_getRatings(
    $skip: Int
    $take: Int
    $where: RatingFilterInput
    $order: [RatingSortInput!]
  ) {
    rating_getRatings {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          createdDate
          targetEntityId
          targetEntityName
          id
          isDeleted
          rate
          review
          user {
            fullName
            photoUrl
            id
          }
          lastModifiedDate
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

export const VIOLATION_REPORT = gql`
mutation (
  $data
  $userId: Int
  $reason: String
  $defaultViolationId: Int
  $targetEntityId: Int
  $targetEntityName: String
) {
  violationReport_createViolationReport(
    input: {
      data:$data
      userId: $userId
      reason: $reason
      defaultViolationId: $defaultViolationId
      targetEntityId: $targetEntityId
      targetEntityName: $targetEntityName
    }
  ) {
    result {
      data
      userId
      targetEntityId
      targetEntityName
      defaultViolationId
      reason
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
`;

export const REMOVE_RATE = gql`
  mutation rating_removeRate($entityId: Int!) {
    rating_removeRate(entityId: $entityId) {
      code
      value
      description
    }
  }
`;
