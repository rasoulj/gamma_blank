import {gql} from 'graphql-request';
import {usePagination} from '~/components/elemental/hooks/usePagination';

export function useGetNearByEvents(options) {
  const {data, isLoading, fetchNextPage} = usePagination({
    gql: GET_EVENTS,
    key: ['get_nearBy_events', options],
    options,
    queryName: 'eventAndTicketing_getNearbyEvents',
  });

  const nearByEvents = data?.pages || [];

  return {
    nearByEvents,
    isLoading,
    fetchNextPage,
  };
}

const GET_EVENTS = gql`
  query eventAndTicketing_getNearbyEvents(
    $latitude: Float!
    $longitude: Float!
    $maxDistance: Float!
  ) {
    eventAndTicketing_getNearbyEvents(
      latitude: $latitude
      longitude: $longitude
      maxDistance: $maxDistance
    ) {
      result {
        items {
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
      status
    }
  }
`;
