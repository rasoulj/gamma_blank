import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components/elemental';

export function useCreateRatingEvent() {
  return useMutation(args => {
    return graphqlFetcher(CREATE_ENVET_RATING, args);
  });
}

export function useRatingRate() {
  return useMutation((args: any) => {
    return graphqlFetcher(RATING_RATE, args);
  });
}

export function useCreateRateProduct() {
  return useMutation((args: any) => {
    return graphqlFetcher(RATING_RATE_PRODUCT, args);
  });
}
export function useCreateRateService() {
  return useMutation((args: any) => {
    return graphqlFetcher(RATING_RATE_SERVICE, args);
  });
}

const CREATE_ENVET_RATING = gql`
  mutation eventAndTicketing_createEventRating($input: EventRatingInput!) {
    eventAndTicketing_createEventRating(input: $input) {
      result {
        userId
        eventId
        rate
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const RATING_RATE = gql`
  mutation rating_rate($input: RatingInput) {
    rating_rate(input: $input) {
      result {
        userId
        targetEntityId
        targetEntityName
        rate
        review
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const RATING_RATE_PRODUCT = gql`
  mutation ecommerceRateReview_createRateAndReview($input: ProductRateInput!) {
    ecommerceRateReview_createRateAndReview(input: $input) {
      result {
        userId
        rate
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
export const RATING_RATE_SERVICE = gql`
  mutation serviceRateReview_createRateAndReview($input: ServiceRateInput!) {
    serviceRateReview_createRateAndReview(input: $input) {
      result {
        userId
        rate
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
