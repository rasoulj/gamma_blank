import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';
export function useGetUserPhotos({
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
}) {
  return useInfiniteQuery(
    ['user_getPhotos', where, order, userId],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_PHOTOS, {
        skip: pageParam * skip,
        take,
        where,
        order,
        userId,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.user_getPhotos?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.user_getPhotos?.result?.items).flat(),
          totalCount: data?.pages?.[0]?.user_getPhotos?.result?.totalCount,
        };
      },
      ...options,
    },
  );
}
export function useUpdateUser() {
  return useMutation<
    unknown,
    unknown,
    {
      userId: number;
      userInput: {
        about?: string;
        age?: number;
        city?: string;
        data?: string;
        dateOfBirth?: Date;
        fullName?: string;
        gender?: 'MALE' | 'FEMALE' | 'OTHER';
        introSeen?: boolean;
        location?: string;
        phoneNumber?: string;
        photoUrl?: string;
        state?: string;
        streetAddress?: string;
        unitNumber?: string;
        userRole?: string;
        userType?: 'OWNER' | 'USER';
        zipCode?: string;
      };
    }
  >(args => {
    return graphqlFetcher(USER_UPDATE_USER, args);
  });
}
export function useAddPhotosUser() {
  return useMutation(args => {
    return graphqlFetcher(USER_ADD_PHOTOS, args);
  });
}
export function useRemovePhotosUser() {
  return useMutation(args => {
    return graphqlFetcher(USER_REMOVE_PHOTOS, args);
  });
}
const GET_PHOTOS = gql`
  query user_getPhotos($userId: Int) {
    user_getPhotos(userId: $userId) {
      result {
        items {
          photoUrl
          id
        }
        totalCount
      }
      status
    }
  }
`;
const USER_UPDATE_USER = gql`
  mutation updateUser($userId: Int, $userInput: UserInput) {
    user_updateUser(userId: $userId, userInput: $userInput) {
      status
    }
  }
`;
export const USER_ADD_PHOTOS = gql`
  mutation user_addPhotos($input: [String]) {
    user_addPhotos(input: $input) {
      status
    }
  }
`;

export const USER_REMOVE_PHOTOS = gql`
  mutation user_removePhotos($input: [Int!]) {
    user_removePhotos(input: $input) {
      code
      value
    }
  }
`;
