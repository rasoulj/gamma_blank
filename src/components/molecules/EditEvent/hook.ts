import {gql} from 'graphql-request';
import useMutation from '../../elemental/cache/use_mutation';
import {graphqlFetcher} from '../../atoms/Provider/AuthProvider';

export function useUpdateEvent() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_EVENT, args);
  });
}

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
