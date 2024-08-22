import {gql} from 'graphql-request';
import {useInfiniteQuery, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetEvents = (options: any = {}) => {
  return useInfiniteQuery(
    ['getEvents', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_EVENTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (
          lastPage?.eventAndTicketing_getEvents?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        // console.log(999);
        // console.log(data?.pages[0]?.eventAndTicketing_getEvents?.result?.items);
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
            owner {
              fullName
              photoUrl
            }
            eventTypeId
            eventType {
              typeTitle
              participants {
                title
                imageUrl
              }
              createdDate
            }
            description
            date
            startTime
            endTime
            zipCode
            price
            currency
            capacity
            participantsCount
            createdDate
            state
            city
            isActive
            eventCategoryId
            eventCategory {
              id
              name
            }
            tickets {
              participant {
                fullName
                photoUrl
              }
            }
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
