import {gql} from 'graphql-request';
import {usePagination} from '~/components/elemental/hooks/usePagination';

export function useGetEvents(options) {
  const {data, isLoading, fetchNextPage} = usePagination({
    gql: GET_EVENTS,
    key: ['get_events', options],
    options,
    queryName: 'eventAndTicketing_getEvents',
  });

  const events = data?.pages || [];

  return {
    events,
    isLoading,
    fetchNextPage,
  };
}

const GET_EVENTS = gql`
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
            title
            category
            description
            id
            streetAddress
            date
            longitude
            latitude
            imageUrl
            state
            startTime
            endTime
          }
        }
        totalCount
      }
      status
    }
  }
`;
