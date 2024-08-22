import { gql } from "graphql-request";
import { useInfiniteQuery } from "react-query";
import { graphqlFetcher } from "~/components";

export const useGetCountries = (options: any = {}) => {
    return useInfiniteQuery(
      ['getCountries', options],
      async ({pageParam = 0}) => {
        return graphqlFetcher(GET_COUNTRIES, {
          skip: pageParam * 240,
          take: 240,
          ...options,
        });
      },
      {
        getNextPageParam: (lastPage: any, allPages: []) => {
          if (lastPage?.countryInfo_getCountries?.result?.pageInfo?.hasNextPage) {
            return allPages.length;
          }
          return undefined;
        },
        select: (data: any) => {
          return {
            ...data,
            pages: data?.pages
              ?.map(a => a?.countryInfo_getCountries?.result?.items)
              .flat(),
            totalCount:
              data?.pages?.[0]?.countryInfo_getCountries?.result?.totalCount,
          };
        },
        ...options,
      },
    );
  };

  export const GET_COUNTRIES = gql`
  query countryInfo_getCountries(
    $skip: Int
    $take: Int
    $where: StringDtoFilterInput
    $order: [StringDtoSortInput!]
  ) {
    countryInfo_getCountries {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          data
        }
        totalCount
      }

      status
    }
  }
`;