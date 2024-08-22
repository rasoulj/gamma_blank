import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CloseIconSet,
  Divider,
  FlatList,
  HStack,
  LoadIndicator,
  TrashIconSet,
  Typography,
  VStack,
  useRoute,
} from '~/components';
import {
  useDeleteAnswerQuestion,
  useGetCourses,
  useSeenQuestions,
} from '../../CourseList/hook';
import CommentInput from '../../PostDetail/CommentInput';
import QuestionCommentItem from './QuestionCommentItem';
import {getColor} from '~/utils/helper/theme.methods';
import MessageReportIconSet from '~/assets/iconset/Files/message-report';
import {useQueryClient} from 'react-query';
import ReportListModal from '../../CourseDetail/Modals/ReportListModal';
import useAuthStore from '~/stores/authStore';
import useHeader from '~/components/elemental/hooks/use_header';

const reportItems = [
  {id: 1, text: `I just don't like it`},
  {id: 2, text: `It's a spam`},
  {id: 3, text: `Nudity or Sexual activity`},
  {id: 4, text: `Violence or dangerous`},
  {id: 5, text: `Bullying or harassement`},
  {id: 6, text: `False information`},
  {id: 7, text: `Hate speech or symbols`},
  {id: 8, text: `Suicide or self-injury`},
  {id: 9, text: `Other`},
];

const ViewQuestions = () => {
  const {params} = useRoute();
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state?.user);

  const [replyTo, setReplyTo] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState(false);

  const {data: courseData, isLoading}: any = useGetCourses({
    where: {
      course: {
        id: {eq: params?.id},
      },
    },
  });

  const questionsData = useMemo(() => {
    if (courseData?.pages?.length > 0) {
      return courseData?.pages[0]?.course?.lessons.flatMap(item =>
        item.topics.map(topic => topic.questions).flat(),
      );
    }
  }, [courseData]);

  const {mutate: deleteMutate, isLoading: deleteLoading} =
    useDeleteAnswerQuestion();

  const {mutate: seenMutate} = useSeenQuestions();

  useEffect(() => {
    seenMutate(
      {courseId: params?.id},
      {
        onSuccess(data) {
          queryClient.invalidateQueries(['getGetNewquestionExists']);
        },
      },
    );
  }, []);

  const {} = useHeader({
    hidden: selected ? true : false,
    title: {children: 'View Questions', fontWeight: 'bold', fontSize: 'lg'},
    hasBack: true,
  });

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Fragment>
          <QuestionCommentItem
            item={item}
            setReplyTo={setReplyTo}
            selected={selected}
            setSelected={setSelected}
            canReply={true}
            educator={user}
            setSelectQuestion={setSelectQuestion}
            selectQuestion={selectQuestion}
          />
          {index < questionsData?.length - 1 && <Divider />}
        </Fragment>
      );
    },
    [selected],
  );

  const onDeletePress = () => {
    deleteMutate(
      {lessonQuestionId: selected?.id},
      {
        onSuccess(data) {
          if (
            data?.course_deleteAnswerToTopicQuestion?.status?.value ===
            'Success'
          ) {
            queryClient.invalidateQueries('getCourses');
            setSelected(null);
            setSelectQuestion(false);
          }
        },
      },
    );
  };

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <>
      {selected && (
        <HStack
          px={'4'}
          py={'3'}
          mx={'5'}
          my={'3'}
          borderRadius={'md'}
          alignItems={'center'}
          shadow={'4'}
          bg={getColor({color: 'primary.100'})}>
          <CloseIconSet onPress={() => setSelected(null)} />
          <Typography
            flex={1}
            fontSize="lg"
            fontWeight={'600'}
            color={'gray.800'}
            ml="6">
            Select
          </Typography>

          {!selectQuestion && (
            <VStack>
              {deleteLoading ? (
                <ActivityIndicator />
              ) : (
                <TrashIconSet
                  color={getColor({color: 'primary.800'})}
                  onPress={() => onDeletePress()}
                />
              )}
            </VStack>
          )}

          {selectQuestion && (
            <MessageReportIconSet
              onPress={() => setIsReportModalVisible(true)}
            />
          )}
        </HStack>
      )}
      <FlatList
        data={questionsData}
        contentContainerStyle={styles.listStyle}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />

      {replyTo && (
        <CommentInput
          postId={replyTo?.id}
          placeholder="Message ..."
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          targetName={'question'}
        />
      )}
      <ReportListModal
        item={selected}
        isVisible={isReportModalVisible}
        entityName="question"
        onClose={() => {
          setSelected(null);
          setIsReportModalVisible(false);
          setSelectQuestion(false);
        }}
        reportList={reportItems}
      />
    </>
  );
};

export default ViewQuestions;

const styles = StyleSheet.create({
  container: {flex: 1},

  listStyle: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});
