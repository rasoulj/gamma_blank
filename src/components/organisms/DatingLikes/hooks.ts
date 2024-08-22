import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';
import {DefaultFilter, IFilterHook} from '../DatingHome/hooks/DatingHome.hook';
import datingLikesStore from '~/stores/datingLikesStore';
import {useState} from 'react';

export const useGetMatches = (options: any = {}) => {
  return useInfiniteQuery(
    ['match_getMatches', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_MATCHES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.match_getMatches?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.match_getMatches?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount: data?.pages?.[0]?.match_getMatches?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useUpdateMatchMutation() {
  return useMutation({
    mutationFn: async args => await graphqlFetcher(UPDATE_MATCH, args),
  });
}

export function useBlockUserhMutation() {
  return useMutation({
    mutationFn: async args => await graphqlFetcher(BLOCK_USER, args),
  });
}

export function useDatingFilter(): IFilterHook {
  const {filter, setFilter, clear: clearStore} = datingLikesStore();
  const [currentFilter, setCurrentFilter] = useState(filter);

  const setValue = (key: string, value: any) => {
    setCurrentFilter({...currentFilter, [key]: value});
    setFilter({...currentFilter, [key]: value});
  };

  const clear = () => {
    setCurrentFilter(DefaultFilter);
    clearStore();
  };

  return {
    filter: currentFilter,
    setValue,
    clear,
  };
}
export function useDatingLikesFilter() {
  const filterHook = useDatingFilter();
  const {applyFilter: onApplyFilter} = datingLikesStore();

  const applyFilter = () => onApplyFilter(filterHook.filter);

  return {applyFilter, filterHook};
}

const GET_MATCHES = gql`
  query match_getMatches(
    $skip: Int
    $take: Int
    $where: MatchFilterInput
    $order: [MatchSortInput!]
  ) {
    match_getMatches {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          matchStatus
          targetUserId
          id
          targetUser {
            fullName
            age
            dateOfBirth
            photoUrl
            id
            matchAnswers {
              question
              answer
            }
          }
          requestedByUserId
          requestedByUser {
            fullName
            age
            id
            dateOfBirth
            photoUrl
            matchAnswers {
              question
              answer
            }
          }
        }
      }
    }
  }
`;

const UPDATE_MATCH = gql`
  mutation match_updateMatch($input: MatchInput) {
    match_updateMatch(input: $input) {
      status
    }
  }
`;

const BLOCK_USER = gql`
  mutation blockUser_block($input: BlockUserInput) {
    blockUser_block(input: $input) {
      status
    }
  }
`;
