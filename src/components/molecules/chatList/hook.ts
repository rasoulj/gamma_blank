import { gql } from "graphql-request";
import { useInfiniteQuery } from "react-query";
import { graphqlFetcher } from "../../atoms/Provider/AuthProvider";




export const useGetPosts = (options: any = {}) => {
    return useInfiniteQuery(
      ['getPosts', options],
      ({pageParam = options}) => graphqlFetcher(GET_ALL_POSTS, pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          return {
            ...options,
            skip: pages.length * 1,
          };
        },
      },
    );
  };
  
  const GET_ALL_POSTS = gql`
    query social_getAllPosts(
      $skip: Int
      $take: Int
      $where: PostFilterInput
      $order: [PostSortInput!]
    ) {
      post_getAllPosts {
        result(skip: $skip, take: $take, where: $where, order: $order) {
          items {
            id
            poster {
              id
              fullName
              photoUrl
            }
            createdDate
            content
            category
            mediaUrl
            commentCount
            postTags {
              id
              title
            }
            likesCount
            isLiked
            comments {
              likeCount
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