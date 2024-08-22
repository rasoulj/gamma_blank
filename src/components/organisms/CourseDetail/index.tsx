import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {
  Button,
  Header,
  LoadIndicator,
  MoreIconSet,
  VStack,
  getColor,
  useNavigate,
  useRoute,
} from '~/components';
import CourseDetailsHeader from './CourseDetailsHeader';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import AboutCourse from './AboutCourse';
import CourseReviews from './CourseReviews';
import CourseDetailModal from './Modals/CourseDetailModal';
import EnrollStatusModal from './Modals/EnrollStatusModal';
import CourseLessons from './CourseLessons';
import {
  useCreateEnrollEducation,
  useDeleteCourse,
  useDisableNotificationUser,
  useGetCourseReviews,
  useGetCourses,
} from '../CourseList/hook';
import {useQueryClient} from 'react-query';
import styles from './styles';
import useAuthStore from '~/stores/authStore';
import EducatorCourseItemModal from '~/components/molecules/EducatorCourseItem/EducatorCourseItemModal';
import ConfirmationModal from '~/components/molecules/EducatorCourseItem/ConfirmationModal';
import {useNavigation} from '@react-navigation/native';
import {durationToSeconds} from '~/utils/helper';
import {TabsPadder} from '~/components/atoms/Header/TabsPadder';

const CourseDetail = () => {
  const {params} = useRoute();

  const [visible, setVisible] = useState(false);
  const [educatorVisible, setEducatorVisible] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const {navigateWithName} = useNavigate();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const user = useAuthStore(state => state?.user);

  const {data, isLoading}: any = useGetCourses({
    where: {course: {id: {eq: params?.id}}},
  });

  let totalDuration = 0;
  let totalTimeToAnswer = 0;

  if (data?.pages?.length > 0) {
    data?.pages[0]?.course?.lessons.forEach(({topics}) => {
      topics.forEach(({duration, exams}) => {
        totalDuration += durationToSeconds(duration);
        exams.forEach(({timeToAnswer, items}) => {
          totalTimeToAnswer += durationToSeconds(timeToAnswer) * items?.length;
        });
      });
    });
  }

  const courseDuration = totalDuration + totalTimeToAnswer;

  const {
    data: reviews,
    isLoading: reviewsLaoding,
    fetchNextPage,
    hasNextPage,
  } = useGetCourseReviews({
    where: {
      review: {
        and: [{parentId: {eq: null}}, {courseId: {eq: params?.id}}],
      },
    },
    order: [{review: {createdDate: 'DESC'}}],
  });

  const {mutate, isLoading: enrollLoading} = useCreateEnrollEducation();
  const {mutate: notifMutate} = useDisableNotificationUser();
  const {mutate: deleteMutate, isLoading: deleteLoading} = useDeleteCourse();

  const icons = useMemo(
    () => (
      <VStack style={styles.rotate}>
        <MoreIconSet
          onPress={() =>
            user?.userRole !== 'educator'
              ? setVisible(true)
              : setEducatorVisible(true)
          }
        />
      </VStack>
    ),
    [],
  );

  const onEnrollPress = () => {
    if (data?.pages[0]?.course?.price === 0) {
      mutate(
        {input: {courseId: params?.id, status: 'IN_PROGRESS'}},
        {
          onSuccess() {
            queryClient.invalidateQueries(['getCourses']);
            notifMutate(
              {targetUserId: data?.pages[0]?.course?.userId},
              {
                onSuccess() {
                  queryClient.invalidateQueries('getDisabledNotification');
                },
              },
            );
            setShowEnroll(true);
          },
        },
      );
    } else {
      navigateWithName('PaymentMethods', {
        item: data?.pages[0]?.course,
        entityName: 'course',
      });
    }
  };

  const onDeleteCourse = () => {
    deleteMutate(
      {entityId: params?.id},
      {
        onSuccess(data) {
          setDeleteVisible(false);
          if (data?.course_deleteCourse?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
            navigation.goBack();
          }
        },
      },
    );
  };

  const TabsHeader = useCallback(() => {
    return (
      <CourseDetailsHeader
        data={data?.pages[0]?.course}
        duration={courseDuration}
      />
    );
  }, [data]);

  const TabBarComponent = React.useCallback(
    props => (
      <MaterialTabBar
        {...props}
        activeColor={getColor({color: 'primary.500'})}
        inactiveColor={getColor({color: 'gray.400'})}
        indicatorStyle={styles.indicator}
        contentContainerStyle={styles.tabContent}
        labelStyle={styles.tabLabel}
        scrollEnabled
      />
    ),
    [],
  );

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <Fragment>
      <TabsPadder />
      <Header title="Course Details" hasBack={true}>
        {icons}
      </Header>
      <Tabs.Container
        renderHeader={TabsHeader}
        headerContainerStyle={styles.tabContainer}
        lazy
        renderTabBar={TabBarComponent}
        initialTabName={params?.initialTabName}>
        <Tabs.Tab name="About" label="About">
          <AboutCourse data={data?.pages[0]?.course} />
        </Tabs.Tab>
        <Tabs.Tab name="Lessons" label="Lessons">
          <CourseLessons data={data?.pages[0]} />
        </Tabs.Tab>
        <Tabs.Tab name="Review" label="Review">
          <CourseReviews
            data={reviews?.pages}
            isEnrolled={data?.pages[0]?.isEnrolled}
            courseId={data?.pages[0]?.course?.id}
            rateData={data?.pages[0]?.course}
            onLoadMore={() => fetchNextPage()}
            hasNextPage={hasNextPage}
          />
        </Tabs.Tab>
      </Tabs.Container>
      {!data?.pages[0]?.isEnrolled && user?.userRole !== 'educator' && (
        <Button
          style={styles.button}
          onPress={onEnrollPress}
          isLoading={enrollLoading}>
          Enroll
        </Button>
      )}
      <CourseDetailModal
        item={data?.pages[0]?.course}
        isVisible={visible}
        onClose={() => setVisible(false)}
      />
      <EnrollStatusModal
        isVisible={showEnroll}
        onClose={() => setShowEnroll(false)}
      />
      <EducatorCourseItemModal
        item={data?.pages[0]?.course}
        onClose={() => setEducatorVisible(false)}
        isVisible={educatorVisible}
        onDelete={() => setDeleteVisible(true)}
      />
      <ConfirmationModal
        title="Are you sure you want to delete this course?"
        rejectTitle="Cancel"
        acceptTitle="Delete"
        onClose={() => setDeleteVisible(false)}
        isVisible={deleteVisible}
        onSubmit={onDeleteCourse}
        isLoading={deleteLoading}
      />
    </Fragment>
  );
};

export default CourseDetail;
