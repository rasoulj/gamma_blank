import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';
export const useCreateReelsMutation = () => {
  return useMutation(args => graphqlFetcher(CREATE_REELS, args));
};

export const useCreateReelsPostMutation = () => {
  return useMutation(args => graphqlFetcher(CREATE_POST, args));
};
const CREATE_REELS = gql`
  mutation reels_createReels($input: ReelsInput) {
    reels_createReels(input: $input) {
      status
    }
  }
`;
const CREATE_POST = gql`
  mutation post_createPost($input: PostInput) {
    post_createPost(input: $input) {
      status
    }
  }
`;
