import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetAppointmentByDate = (options: any = {}) => {
  return useInfiniteQuery(
    ['getAppointmentByDate', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_APPOINTMENT_BY_DATE, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.workingSchedule_getForOneDate?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.workingSchedule_getForOneDate?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.workingSchedule_getForOneDate?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetAppointmentTime = (options: any = {}) => {
  return useInfiniteQuery(
    ['getAppointmentTime', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_APPOINTMENT_TIME, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.workingSchedule_getWorkingSchedules?.result?.pageInfo
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
            ?.map(a => a?.workingSchedule_getWorkingSchedules?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.workingSchedule_getWorkingSchedules?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetAvailableDays = (options: any = {}) => {
  console.log(options);
  
  return useInfiniteQuery(
    ['getAvailableDays', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_AVAILABLE_DAYS, {
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

const GET_AVAILABLE_DAYS = gql`
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

const GET_APPOINTMENT_TIME = gql`
  query workingSchedule_getWorkingSchedules(
    $skip: Int
    $take: Int
    $where: WorkingScheduleFilterInput
    $order: [WorkingScheduleSortInput!]
    $userId: Int
  ) {
    workingSchedule_getWorkingSchedules(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          periods {
            createdDate
            endTime
            id
            startTime
          }
          repeatEveryType
          startsOn
          dayOfWeek
          endsAfter
          userId
          user {
            fullName
            id
            photoUrl
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
const GET_APPOINTMENT_BY_DATE = gql`
  query workingSchedule_getForOneDate(
    $skip: Int
    $take: Int
    $where: WorkingScheduleFilterInput
    $order: [WorkingScheduleSortInput!]
    $userId: Int
    $date: DateTime!
  ) {
    workingSchedule_getForOneDate(userId: $userId, date: $date) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          periods {
            createdDate
            endTime
            id
            startTime
          }
          repeatEveryType
          startsOn
          dayOfWeek
          endsAfter
          userId
          user {
            fullName
            id
            photoUrl
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
