import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export function useCreateAvailableTimeMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(MATCH_CREATE_AVAILABLE_TIME, args);
  });
}

export const useGetMatchTimes = (options: any = {}) => {
  return useInfiniteQuery(
    ['match_getAvailableTimes', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_MATCH_AVAILABLE_TIME, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.match_getAvailableTimes?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.match_getAvailableTimes?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.match_getAvailableTimes?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetMatchAppointments = (options: any = {}) => {
  return useInfiniteQuery(
    ['match_getAppointments', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_MATCH_APPOINTMENTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.match_getAppointments?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.match_getAppointments?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.match_getAppointments?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useDeleteAppointmentMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_APPOINTMENT, args);
  });
}

const MATCH_CREATE_AVAILABLE_TIME = gql`
  mutation match_createAvailableTime($date: DateTime!, $times: [TimeSpan!]) {
    match_createAvailableTime(date: $date, times: $times) {
      status
    }
  }
`;

const GET_MATCH_AVAILABLE_TIME = gql`
  query match_getAvailableTimes(
    $userId: Int!
    $skip: Int
    $take: Int
    $order: [AvailableTimeForDatingSortInput!]
    $where: AvailableTimeForDatingFilterInput
  ) {
    match_getAvailableTimes(userId: $userId) {
      result(skip: $skip, take: $take, order: $order, where: $where) {
        items {
          date
          times
          id
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

const GET_MATCH_APPOINTMENTS = gql`
  query match_getAppointments(
    $skip: Int
    $take: Int
    $where: MatchAppointmentFilterInput
    $order: [MatchAppointmentSortInput!]
  ) {
    match_getAppointments {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          otherUserId
          userId
          user {
            photoUrl
            fullName
            age
            dateOfBirth
            id
            email
          }
          appointmentStatus
          dateAndTime
          otherUser {
            photoUrl
            fullName
            age
            dateOfBirth
            id
            email
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

const DELETE_APPOINTMENT = gql`
  mutation match_deleteAppointment($appointmentId: Int!) {
    match_deleteAppointment(appointmentId: $appointmentId) {
      code
      value
    }
  }
`;
