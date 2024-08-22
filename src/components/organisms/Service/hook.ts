import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components';

export const useGetServices = (options: any = {}) => {
  return useInfiniteQuery(
    ['getServices', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SERVICES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.service_getServices?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.service_getServices?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.service_getServices?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
export const useGetBookings = (options: any = {}) => {
  return useInfiniteQuery(
    ['getBookings', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_BOOKINGS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.booking_getBookings?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.booking_getBookings?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.booking_getBookings?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetBookingsDay = (options: any = {}) => {
  return useInfiniteQuery(
    ['getBookingsDay', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_BOOKINGS_DAY, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.booking_getAvailableDays?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.booking_getAvailableDays?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.booking_getAvailableDays?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetRatingRate = (options: any = {}) => {
  return useInfiniteQuery(
    ['getRatingService', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_RATINGS_RATE, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.serviceRateReview_getReviews?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.serviceRateReview_getReviews?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.serviceRateReview_getReviews?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useCreateBlockUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(BLOCK_USER, args);
  });
}

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

export function useCreateService() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_SERVICE, args);
  });
}

export function useUpdateService() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SERVICE, args);
  });
}

export function useDeleteService() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_SERVICE, args);
  });
}

export function useUpdateBooking() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_BOOKING, args);
  });
}

export const UPDATE_BOOKING = gql`
  mutation booking_updateBooking($input: BookingInput) {
    booking_updateBooking(input: $input) {
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

export const GET_BOOKINGS_DAY = gql`
  query booking_getAvailableDays(
    $skip: Int
    $take: Int
    $where: AvailableDayDtoFilterInput
    $order: [AvailableDayDtoSortInput!]
    $input: AvailableDayInput
  ) {
    booking_getAvailableDays(input: $input) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          date
          isAvailable
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

export const DELETE_SERVICE = gql`
  mutation service_deleteService($entityId: Int!) {
    service_deleteService(entityId: $entityId) {
      code
      value
      description
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation service_updateService($input: ServiceInput) {
    service_updateService(input: $input) {
      result {
        userId
        category
        title
        description
        price
        duration
        photoUrl
        rateCount
        rateAverage
        serviceType
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation service_createService($input: ServiceInput) {
    service_createService(input: $input) {
      result {
        userId
        category
        title
        description
        price
        duration
        photoUrl
        rateCount
        rateAverage
        serviceType
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
  mutation serviceRateReview_removeReview($reviewId: Int!) {
    serviceRateReview_removeReview(reviewId: $reviewId) {
      result {
        review
        userId
        serviceId
        likesCount
        id
        isDeleted
        createdDate
        lastModifiedDate
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

export const BLOCK_USER = gql`
  mutation blockUser_block($input: BlockUserInput!) {
    blockUser_block(input: $input) {
      result {
        userId
        blockedUserId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const GET_RATINGS_RATE = gql`
  query serviceRateReview_getReviews(
    $skip: Int
    $take: Int
    $where: ServiceReviewDtoFilterInput
    $order: [ServiceReviewDtoSortInput!]
  ) {
    serviceRateReview_getReviews {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          review {
            id
            review
            createdDate
            user {
              id
              fullName
              photoUrl
            }
          }
          isLikedByCurrentUser
          rateByReviewCreator
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
export const GET_BOOKINGS = gql`
  query booking_getBookings(
    $skip: Int
    $take: Int
    $where: BookingFilterInput
    $order: [BookingSortInput!]
  ) {
    booking_getBookings {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          accepted
          address
          contractor {
            about
            fullName
            photoUrl
            id
          }
          customer {
            about
            fullName
            photoUrl
            id
          }
          contractorId
          createdDate
          service {
            id
            title
            photoUrl
            category
            description
            duration
            serviceType
          }
          startTime
          endTime
          status
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

export const GET_SERVICES = gql`
  query service_getServices(
    $skip: Int
    $take: Int
    $where: ServiceDtoFilterInput
    $order: [ServiceDtoSortInput!]
  ) {
    service_getServices {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          service {
            category
            startTime
            endTime
            date
            createdDate
            description
            duration
            id
            isDeleted
            lastModifiedDate
            photoUrl
            price
            rateAverage
            rateCount
            serviceType
            title
            user {
              fullName
              id
              photoUrl
            }
            userId
          }
          rateByCurrentUser {
            rate
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
