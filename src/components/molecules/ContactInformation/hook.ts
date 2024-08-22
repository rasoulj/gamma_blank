import {gql} from 'graphql-request';
import {useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export function useCreateBooking() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_BOOKING, args);
  });
}

const CREATE_BOOKING = gql`
  mutation booking_createBooking($input: BookingInput) {
    booking_createBooking(input: $input) {
      result {
        customerId
        contractorId
        startTime
        endTime
        status
        price
        paid
        accepted
        fullName
        phoneNumber
        address
        serviceId
        rateCount
        rateAverage
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
