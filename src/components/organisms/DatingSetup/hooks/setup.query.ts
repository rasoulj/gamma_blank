import {gql} from 'graphql-request';
import {InfiniteData, useInfiniteQuery, useQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components';
import {QuestionAnswer} from '../types';

const GET_DATING_ANSWERS = gql`
  query match_getAnswers(
    $skip: Int
    $take: Int
    $where: MatchQuestionAnswerFilterInput
    $order: [MatchQuestionAnswerSortInput!]
    $userId: Int!
  ) {
    match_getAnswers(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          question
          answer
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

const ANSWER_TO_QUESTION = gql`
  mutation match_answerToQuestion($question: String!, $answer: String!) {
    match_answerToQuestion(question: $question, answer: $answer) {
      result {
        userId
        question
        answer
        id
      }
      status
    }
  }
`;

function flatPages(data: InfiniteData<unknown>): QuestionAnswer[] {
  return (data?.pages ?? [])
    .map((a: any) => a?.match_getAnswers?.result?.items)
    .flat();
}

export function useGetAnswers({userId}) {
  const keys = ['getAnswers', userId];
  return useInfiniteQuery(
    keys,
    async () => {
      return graphqlFetcher(GET_DATING_ANSWERS, {userId, skip: 0, take: 40});
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        return undefined;
      },
      select: data => {
        const pages = flatPages(data);
        return {
          ...data,
          pages,
          totalCount: pages.length,
        };
      },
    },
  );
}

export function useAnswerQuestion() {
  return useMutation((args: {question: string; answer: any}) => {
    return graphqlFetcher(ANSWER_TO_QUESTION, args);
  });
}
