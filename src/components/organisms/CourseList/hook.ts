import {gql} from 'graphql-request';
import {useInfiniteQuery, useQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components/elemental';

export const useGetCourses = (options: any = {}) => {
  return useInfiniteQuery(
    ['getCourses', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_COURCES, {
        skip: pageParam * 10,
        take: 12,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getCourses?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getCourses?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.course_getCourses?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_COURCES = gql`
  query course_getCourses(
    $skip: Int
    $take: Int
    $where: CourseDtoFilterInput
    $order: [CourseDtoSortInput!]
  ) {
    course_getCourses {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          course {
            reviewCount
            title
            description
            category
            subcategory
            photoUrl
            price
            duration
            userId
            level
            faq
            isDraft
            lessonCount
            hasCertificate
            aboutCertificate
            keywords
            rateAverage
            ratePercent_1
            ratePercent_2
            ratePercent_3
            ratePercent_4
            ratePercent_5
            paymentTopicConfiguration
            user {
              photoUrl
              fullName
              profession
              id
            }
            lessons {
              title
              id
              topics {
                isDraft
                questions {
                  id
                  question
                  answer
                  answerDate
                  createdDate
                  user {
                    photoUrl
                    fullName
                    id
                  }
                }
                topic
                content
                duration
                lessonId
                exams {
                  id
                  timeToAnswer
                  minPassingScore
                  lessonTopicId
                  isDraft
                  items {
                    id
                  }
                }
                id
              }
            }
            id
            createdDate
          }
          isEnrolled
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

export const useGetCourseReviews = (options: any = {}) => {
  return useInfiniteQuery(
    ['getCourseReviews', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_COURCE_REVIEWS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getReviews?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getReviews?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.course_getReviews?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_COURCE_REVIEWS = gql`
  query course_getReviews(
    $skip: Int
    $take: Int
    $where: CourseReviewDtoFilterInput
    $order:[CourseReviewDtoSortInput!]
  ) {
    course_getReviews() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          review{    
            children {
            likesCount
            review
            user {
              photoUrl
              fullName
            }
            createdDate
            id
            parentId
          }
          user {
            photoUrl
            fullName
          }
          userId
          review
          likesCount
          courseId
          isDeleted
          id
          createdDate
        }
          isLikedByCurrentUser
      
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

export function useCreateRateEducation() {
  return useMutation((args: any) => {
    return graphqlFetcher(RATING_RATE_EDUCATION, args);
  });
}

export const RATING_RATE_EDUCATION = gql`
  mutation course_createRate($input: CourseRateInput!) {
    course_createRate(input: $input) {
      result {
        userId
        rate
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useCreateReviewEducation() {
  return useMutation((args: any) => {
    return graphqlFetcher(RATING_REWIEW_EDUCATION, args);
  });
}

export const RATING_REWIEW_EDUCATION = gql`
  mutation course_createReview($input: CourseReviewInput!) {
    course_createReview(input: $input) {
      result {
        userId
        review
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useCreateLikeReviewEducation() {
  return useMutation((args: any) => {
    return graphqlFetcher(LIKE_REVIEW_EDUCATION, args);
  });
}

export const LIKE_REVIEW_EDUCATION = gql`
  mutation course_likeReview($reviewId: Int!) {
    course_likeReview(reviewId: $reviewId) {
      result {
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useRemoveLikeReviewEducation() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_LIKE_REVIEW_EDUCATION, args);
  });
}

export const REMOVE_LIKE_REVIEW_EDUCATION = gql`
  mutation course_removeLikeReview($reviewId: Int!) {
    course_removeLikeReview(reviewId: $reviewId) {
      result {
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useCreateEnrollEducation() {
  return useMutation((args: any) => {
    return graphqlFetcher(ENROLL_EDUCATION, args);
  });
}

export const ENROLL_EDUCATION = gql`
  mutation course_enroll($input: EnrollCourseInput) {
    course_enroll(input: $input) {
      result {
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useCreatePaymentEducation() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_PAYMENT, args);
  });
}

export const CREATE_PAYMENT = gql`
  mutation paymentStripe_payWithIntent($amount: Decimal!) {
    paymentStripe_payWithIntent(amount: $amount) {
      result {
        publishableKey
        clientSecret
      }
      status
    }
  }
`;

export const useGetMyCourses = (options: any = {}) => {
  return useInfiniteQuery(
    ['getMyCourses', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_MY_COURCES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.course_getEnrolledCourses?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getEnrolledCourses?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.course_getEnrolledCourses?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_MY_COURCES = gql`
  query course_getEnrolledCourses(
    $skip: Int
    $take: Int
    $where: EnrollCourseFilterInput
    $order: [EnrollCourseSortInput!]
  ) {
    course_getEnrolledCourses() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          progress 
          status 
          courseId
          nextTopicId
          completeDate
          examAverage
          course{
            title
            category
            photoUrl
            price
            rateAverage
            hasCertificate
            user{
              fullName
            }
          }
          isDeleted
          id
          createdDate
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

export function useUpdateLesson() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_LESSON, args);
  });
}

export const UPDATE_LESSON = gql`
  mutation course_updateLessonTopic($input: LessonTopicInput) {
    course_updateLessonTopic(input: $input) {
      result {
        topic
        content
        duration
        lessonId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useAddTopicToFavorite() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_LESSON_TO_FAVORITE, args);
  });
}

export const ADD_LESSON_TO_FAVORITE = gql`
  mutation course_addTopicToFavorite($lessonId: Int!) {
    course_addTopicToFavorite(lessonId: $lessonId) {
      result {
        id
      }
      status
    }
  }
`;

export function useRemoveTopicToFavorite() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_LESSON_TO_FAVORITE, args);
  });
}

export const REMOVE_LESSON_TO_FAVORITE = gql`
  mutation course_removeTopicFromFavorite($lessonId: Int!) {
    course_removeTopicFromFavorite(lessonId: $lessonId) {
      code
    }
  }
`;

export const useFaviriteLessons = (options: any = {}) => {
  return useInfiniteQuery(
    ['getFavoriteLessons', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_FAVORITE_LESSONS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getFavoriteTopics?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getFavoriteTopics?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.course_getFavoriteTopics?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_FAVORITE_LESSONS = gql`
  query course_getFavoriteTopics(
    $skip: Int
    $take: Int
    $where: FavoriteLessonTopicFilterInput
    $order: [FavoriteLessonTopicSortInput!]
  ) {
    course_getFavoriteTopics {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          topicId
          id
          topic {
            topic
            content
            lesson {
              title
            }
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

export const useGetExams = (options: any = {}) => {
  return useInfiniteQuery(
    ['getExams', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_EXAMS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getExams?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getExams?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.course_getExams?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_EXAMS = gql`
  query course_getExams(
    $skip: Int
    $take: Int
    $where: ExamFilterInput
    $order: [ExamSortInput!]
  ) {
    course_getExams {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          timeToAnswer
          minPassingScore
          lessonTopicId
          isDraft
          items {
            question
            rightAnswer
            examId
            id
            options
          }
          id
          createdDate
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

export function useUpdateExamItem() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_EXAM_ITEM, args);
  });
}

export const UPDATE_EXAM_ITEM = gql`
  mutation course_updateExamItem($input: ExamItemInput) {
    course_updateExamItem(input: $input) {
      result {
        id
      }
      status
    }
  }
`;

export function useTopicIsInFavorite() {
  return useMutation((args: any) => {
    return graphqlFetcher(IS_TOPIC_IN_FAVORITE, args);
  });
}

export const IS_TOPIC_IN_FAVORITE = gql`
  query course_topicIsInFavorite($topicIds: [Int!]) {
    course_topicIsInFavorite(topicIds: $topicIds) {
      result {
        key
        value
      }
      status
    }
  }
`;

export function useCreateQuestion() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_QUESTION, args);
  });
}

export const CREATE_QUESTION = gql`
  mutation course_createTopicQuestion($lessonTopicId: Int!, $question: String) {
    course_createTopicQuestion(
      lessonTopicId: $lessonTopicId
      question: $question
    ) {
      result {
        id
      }
      status
    }
  }
`;

export function useReviewIsLiked() {
  return useMutation((args: any) => {
    return graphqlFetcher(IS_REVIEW_LIKED, args);
  });
}

export const IS_REVIEW_LIKED = gql`
  query course_reviewIsLiked($reviewIds: [Int!]) {
    course_reviewIsLiked(reviewIds: $reviewIds) {
      result {
        key
        value
      }
      status
    }
  }
`;

export function useCreateCourse() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_COURSE, args);
  });
}

export const CREATE_COURSE = gql`
  mutation course_createCourse($input: CourseInput) {
    course_createCourse(input: $input) {
      result {
        id
      }
      status
    }
  }
`;

export function useAnswerExam() {
  return useMutation((args: any) => {
    return graphqlFetcher(ANSWER_EXAM, args);
  });
}

export const ANSWER_EXAM = gql`
  mutation course_answerToExam($input: [ExamItemAnswerInput]) {
    course_answerToExam(input: $input) {
      result {
        rightAnswersCount
        questionsCount
        passed
        userId
        examId
      }
      status
    }
  }
`;

export const useExamResults = (options: any = {}) => {
  return useInfiniteQuery(
    ['getExamResults', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_EXAM_RESULTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getExamResults?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getExamResults?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.course_getExamResults?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_EXAM_RESULTS = gql`
  query course_getExamResults(
    $skip: Int
    $take: Int
    $where: ExamResultFilterInput
    $order: [ExamResultSortInput!]
  ) {
    course_getExamResults {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          passed
          rightAnswersCount
          questionsCount
          examId
          userId
          exam {
            id
            timeToAnswer
            minPassingScore
            lessonTopicId
            items {
              id
            }
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

export function useCreateExamItem() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREARTE_EXAM_ITEM, args);
  });
}

export const CREARTE_EXAM_ITEM = gql`
  mutation course_createExamItem($input: ExamItemInput) {
    course_createExamItem(input: $input) {
      result {
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const useGetUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.user_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.user_getUsers?.result?.items).flat(),
          totalCount: data?.pages?.[0]?.user_getUsers?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_ALL_USERS = gql`
  query user_getUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    user_getUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          fullName
          photoUrl
          about
          socialLinks
          profession
          isVerified
          yearsOfExperience
          createdDate
          ratePercent_1
          ratePercent_2
          ratePercent_3
          ratePercent_4
          ratePercent_5
          rateAverage
          reviewCount
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

export const useGetUserSpecialties = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUserSpecialties', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USER_SPECIALITIES, {
        skip: pageParam * 10,
        take: 50,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.specialty_getSpecialties?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.specialty_getSpecialties?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.specialty_getSpecialties?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_ALL_USER_SPECIALITIES = gql`
  query specialty_getSpecialties(
    $userId: Int
    $skip: Int
    $take: Int
    $where: SpecialtyFilterInput
    $order: [SpecialtySortInput!]
  ) {
    specialty_getSpecialties(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          title
          userId
          createdDate
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

export const useGetUserCertificates = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUserCertificates', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USER_CERTIFICATES, {
        skip: pageParam * 10,
        take: 50,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.certificate_getCertificates?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.certificate_getCertificates?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.certificate_getCertificates?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_ALL_USER_CERTIFICATES = gql`
  query certificate_getCertificates(
    $userId: Int
    $skip: Int
    $take: Int
    $where: CertificateFilterInput
    $order: [CertificateSortInput!]
  ) {
    certificate_getCertificates(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          url
          userId
          createdDate
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

export function useReadTopic() {
  return useMutation((args: any) => {
    return graphqlFetcher(READ_TOPIC, args);
  });
}

export const READ_TOPIC = gql`
  mutation course_readTopic($lessonTopicId: Int!) {
    course_readTopic(lessonTopicId: $lessonTopicId) {
      code
    }
  }
`;

export const useGetReadTopics = (options: any = {}) => {
  return useInfiniteQuery(
    ['getReadTopics', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_READ_TOPICS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getTopicsReed?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getTopicsReed?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.course_getTopicsReed?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_ALL_READ_TOPICS = gql`
  query course_getTopicsReed(
    $skip: Int
    $take: Int
    $where: LessonTopicReadFilterInput
    $order: [LessonTopicReadSortInput!]
  ) {
    course_getTopicsReed {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          userId
          createdDate
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

export function useCreateUserReview() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_USER_REVIEW, args);
  });
}

export const CREATE_USER_REVIEW = gql`
  mutation user_createReview($input: UserReviewInput) {
    user_createReview(input: $input) {
      status
    }
  }
`;

export function useCreateUserRate() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_USER_RATE, args);
  });
}

export const CREATE_USER_RATE = gql`
  mutation user_createRate($input: UserRateInput) {
    user_createRate(input: $input) {
      status
    }
  }
`;

export const useGetUserReviews = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUserReviews', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USER_REVIEWS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.user_getReviews?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getReviews?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.user_getReviews?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_USER_REVIEWS = gql`
  query user_getReviews(
    $targetUserId: Int!
    $skip: Int
    $take: Int
    $where: UserReviewDtoFilterInput
    $order: [UserReviewDtoSortInput!]
  ) {
    user_getReviews(targetUserId: $targetUserId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          review {
            children {
              likesCount
              review
              user {
                photoUrl
                fullName
              }
              createdDate
              id
              parentId
            }
            user {
              photoUrl
              fullName
            }
            userId
            review
            likesCount
            targetUserId
            isDeleted
            id
            createdDate
          }
          isLikedByCurrentUser
          rateByReviewCreator
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

export function useDisableNotificationUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(DISABLE_NOTIFICATION_USER, args);
  });
}

export const DISABLE_NOTIFICATION_USER = gql`
  mutation notification_disableNotificationFromUser($targetUserId: Int!) {
    notification_disableNotificationFromUser(targetUserId: $targetUserId) {
      status
    }
  }
`;

export function useEnableNotificationUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(ENABLE_NOTIFICATION_USER, args);
  });
}

export const ENABLE_NOTIFICATION_USER = gql`
  mutation notification_enableNotificationFromUser($targetUserId: Int!) {
    notification_enableNotificationFromUser(targetUserId: $targetUserId) {
      status
    }
  }
`;

export const useGetDisabledNotification = (options: any = {}) => {
  return useInfiniteQuery(
    ['getDisabledNotification', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ISABLED_NOTIFICATION, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.notification_getDisabledNotificationFromUsers?.result
            ?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(
              a =>
                a?.notification_getDisabledNotificationFromUsers?.result?.items,
            )
            .flat(),
          totalCount:
            data?.pages?.[0]?.notification_getDisabledNotificationFromUsers
              ?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ISABLED_NOTIFICATION = gql`
  query notification_getDisabledNotificationFromUsers(
    $skip: Int
    $take: Int
    $where: DisabledNotificationFromUserFilterInput
    $order: [DisabledNotificationFromUserSortInput!]
  ) {
    notification_getDisabledNotificationFromUsers() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          targetUserId
          id
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

export const useGetStreak = (options: any = {}) => {
  return useQuery(['getGetStreak'], async () => {
    return graphqlFetcher(GET_STREAK);
  });
};

export const GET_STREAK = gql`
  query streak_getStreak {
    streak_getStreak() {
        result {
          current{
            startDate
            endDate
            dayCount 
            id
          }
          best{
            startDate
            endDate
            dayCount 
            id
          }
        }
      status
    }
  }
`;

export function useCreateStreak() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_STREAK, args);
  });
}

export const CREATE_STREAK = gql`
  mutation streak_createStreak() {
    streak_createStreak() {
      status
    }
  }
`;

export const useGetStreaks = (options: any = {}) => {
  return useInfiniteQuery(
    ['getStreaks', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_STREAKS, {
        skip: pageParam * 10,
        take: 100,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.streak_getStreaks?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.streak_getStreaks?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.streak_getStreaks?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_STREAKS = gql`
  query streak_getStreaks(
    $skip: Int
    $take: Int
    $where: StreakFilterInput
    $order: [StreakSortInput!]
  ) {
    streak_getStreaks() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          endDate 
          startDate
          dayCount 
          id
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

export function useDeleteCourse() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_COURSE, args);
  });
}

export const DELETE_COURSE = gql`
  mutation course_deleteCourse($entityId: Int!) {
    course_deleteCourse(entityId: $entityId) {
      code
      value
    }
  }
`;

export const useGetUserBadges = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUserBadges', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_BADGES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.badge_getUserBadges?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.badge_getUserBadges?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.badge_getUserBadges?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_BADGES = gql`
  query badge_getUserBadges(
    $userId: Int!
    $skip: Int
    $take: Int
    $where: UserBadgeFilterInput
    $order: [UserBadgeSortInput!]
  ) {
    badge_getUserBadges(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          createdDate
          id
          userId
          badgeType
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

export function useUpdateCourse() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_COURSE, args);
  });
}

export const UPDATE_COURSE = gql`
  mutation course_updateCourse($input: CourseInput) {
    course_updateCourse(input: $input) {
      status
    }
  }
`;

export function useCreateLesson() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_LESSON, args);
  });
}

export const CREATE_LESSON = gql`
  mutation course_createLesson($input: LessonInput) {
    course_createLesson(input: $input) {
      result {
        id
      }
      status
    }
  }
`;

export function useCreateLessonTopic() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_LESSON_TOPIC, args);
  });
}

export const CREATE_LESSON_TOPIC = gql`
  mutation course_createLessonTopic($input: LessonTopicInput) {
    course_createLessonTopic(input: $input) {
      status
    }
  }
`;

export function useEditLesson() {
  return useMutation((args: any) => {
    return graphqlFetcher(EDIT_LESSON, args);
  });
}

export const EDIT_LESSON = gql`
  mutation course_updateLesson($input: LessonInput) {
    course_updateLesson(input: $input) {
      status
    }
  }
`;

export function useDeleteLesson() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_LESSON, args);
  });
}

export const DELETE_LESSON = gql`
  mutation course_deleteLesson($lessonId: Int!) {
    course_deleteLesson(lessonId: $lessonId) {
      value
    }
  }
`;

export const useGetStatistics = (options: any = {}) => {
  return useQuery(['getStatistics'], async () => {
    return graphqlFetcher(GET_STATISTICS, options);
  });
};

export const GET_STATISTICS = gql`
  query course_getStatistics($courseId: Int!) {
    course_getStatistics(courseId: $courseId) {
      status
      result {
        enrollCount
        questionCount
        commentCount
        rateAverage
        title
        enrolls {
          year
          months {
            month
            count
          }
        }
      }
    }
  }
`;

export const useGeTopics = (options: any = {}) => {
  return useInfiniteQuery(
    ['getTopics', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_TOPICS, {
        skip: pageParam * 10,
        take: 20,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.course_getTopics?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getTopics?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.course_getTopics?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_ALL_TOPICS = gql`
  query course_getTopics(
    $lessonId: Int!
    $skip: Int
    $take: Int
    $where: LessonTopicDtoFilterInput
    $order: [LessonTopicDtoSortInput!]
  ) {
    course_getTopics(lessonId: $lessonId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          topic {
            id
            content
            isDraft
            topic
            duration
          }
          isRead
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

export function useCreateExam() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREARTE_EXAM, args);
  });
}

export const CREARTE_EXAM = gql`
  mutation course_createExam($input: ExamInput) {
    course_createExam(input: $input) {
      result {
        lessonTopic {
          lesson {
            courseId
          }
        }
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useUpdateExam() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_EXAM, args);
  });
}

export const UPDATE_EXAM = gql`
  mutation course_updateExam($input: ExamInput) {
    course_updateExam(input: $input) {
      result {
        lessonTopic {
          lesson {
            courseId
          }
        }
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useDeleteExamItem() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_EXAM_ITEM, args);
  });
}

export const DELETE_EXAM_ITEM = gql`
  mutation course_deleteExamItem($examItemId: Int!) {
    course_deleteExamItem(examItemId: $examItemId) {
      value
      description
    }
  }
`;

export function useDeleteReview() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_REVIEW, args);
  });
}

export const DELETE_REVIEW = gql`
  mutation course_deleteReview($reviewId: Int!) {
    course_deleteReview(reviewId: $reviewId) {
      value
    }
  }
`;

export function useAnswerQuestion() {
  return useMutation((args: any) => {
    return graphqlFetcher(ANSWER_QUESTION, args);
  });
}

export const ANSWER_QUESTION = gql`
  mutation course_answerToTopicQuestion(
    $lessonQuestionId: Int!
    $answer: String
  ) {
    course_answerToTopicQuestion(
      lessonQuestionId: $lessonQuestionId
      answer: $answer
    ) {
      result {
        id
      }
      status
    }
  }
`;

export function useDeleteAnswerQuestion() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_ANSWER_QUESTION, args);
  });
}

export const DELETE_ANSWER_QUESTION = gql`
  mutation course_deleteAnswerToTopicQuestion($lessonQuestionId: Int!) {
    course_deleteAnswerToTopicQuestion(lessonQuestionId: $lessonQuestionId) {
      result {
        id
      }
      status
    }
  }
`;

export function useUpdateSpecialties() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SPECIALTIES, args);
  });
}

export const UPDATE_SPECIALTIES = gql`
  mutation specialty_updateSpecialties($input: [String]) {
    specialty_updateSpecialties(input: $input) {
      value
      description
    }
  }
`;

export function useUpdateCertificate() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_CERTIFICATE, args);
  });
}

export const UPDATE_CERTIFICATE = gql`
  mutation certificate_updateCertificates($input: [CertificateInput]) {
    certificate_updateCertificates(input: $input) {
      value
      description
    }
  }
`;

export function useDeleteTopic() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_TOPIC, args);
  });
}

export const DELETE_TOPIC = gql`
  mutation course_deleteLessonTopic($lessonTopicId: Int!) {
    course_deleteLessonTopic(lessonTopicId: $lessonTopicId) {
      value
      description
    }
  }
`;

export function useSeenQuestions() {
  return useMutation((args: any) => {
    return graphqlFetcher(SEEN_QUESTIONS, args);
  });
}

export const SEEN_QUESTIONS = gql`
  mutation course_seenQuestions($courseId: Int!) {
    course_seenQuestions(courseId: $courseId) {
      value
      description
    }
  }
`;

export const useGetNewquestionExists = (options: any = {}) => {
  return useQuery(['getGetNewquestionExists'], async () => {
    return graphqlFetcher(GET_NEW_QUESTIONS, options);
  });
};

export const GET_NEW_QUESTIONS = gql`
  query course_newQuestionExists($courseId: Int!) {
    course_newQuestionExists(courseId: $courseId) {
      value
      description
    }
  }
`;

export function useCreateOneTimePayment() {
  return useMutation((args: any) => {
    return graphqlFetcher(ONE_TIME_PAYMENT, args);
  });
}

export const ONE_TIME_PAYMENT = gql`
  mutation paymentStripe_payment($input: StripePaymentInput) {
    paymentStripe_payment(input: $input) {
      result {
        id
        paymentDate
        entityId
        receiptEmail
        amount
        description
        receiptUrl
        failureMessage
        receiptNumber
        last4CardNumber
      }
      status
    }
  }
`;
