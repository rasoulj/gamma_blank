import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetWorkingSchedules = ({
  take = 10,
  skip = 0,
  where,
  order,
  userId,
  options,
}: {
  take?: number;
  skip?: number;
  where?: any;
  order?: any;
  userId: number;
  options?: any;
}) => {
  return useInfiniteQuery(
    ['getWorkingSchedules', where, order, userId],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_WORKING_SCHEDULES, {
        skip: pageParam * skip,
        take,
        where,
        order,
        userId,
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
export function useDeleteWorkingSchedule() {
  return useMutation(args => {
    return graphqlFetcher(DELETE_WORKING_SCHEDULE, args);
  });
}
const GET_WORKING_SCHEDULES = gql`
  query getWorkingSchedules(
    $skip: Int
    $take: Int
    $where: WorkingScheduleFilterInput
    $order: [WorkingScheduleSortInput!]
    $userId: Int
  ) {
    workingSchedule_getWorkingSchedules(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          userId
          startsOn
          endsOn
          endsAfter
          periods {
            startTime
            endTime
          }
          dayOfWeek
          repeatType
          repeatEveryType
          repeatEveryValue
          id
        }
        totalCount
      }
      status
    }
  }
`;

const DELETE_WORKING_SCHEDULE = gql`
  mutation deleteWorkingSchedule($entityId: Int!) {
    workingSchedule_deleteWorkingSchedule(entityId: $entityId) {
      code
      value
      description
    }
  }
`;
