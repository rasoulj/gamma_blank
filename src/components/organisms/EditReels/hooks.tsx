import {gql} from 'graphql-request';
import {useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useUpdatePostMutation = () => {
  return useMutation(args => graphqlFetcher(UPDATE_POST, args));
};
export const useGetpostQuery = (variables?: any, options?: any) => {
  return useQuery(
    ['post_getPostById', variables],
    () => graphqlFetcher(POST_GET_POST, variables),
    options,
  );
};
const UPDATE_POST = gql`
  mutation post_updatePost($input: PostInput) {
    post_updatePost(input: $input) {
      status
    }
  }
`;
const POST_GET_POST = gql`
  query post_getPostById($postId: Int!) {
    post_getPostById(entityId: $postId) {
      status
      result {
        mediaUrl
        id
        content
        locations
        thumbnail
      }
    }
  }
`;
