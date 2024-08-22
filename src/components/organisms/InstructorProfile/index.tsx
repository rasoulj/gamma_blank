import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {
  Header,
  LoadIndicator,
  MoreIconSet,
  VStack,
  useRoute,
} from '~/components';
import EducatorProfile from './EducatorProfile';
import AboutEducator from './AboutEducator';
import EducatorCources from './EducatorCources';
import EducatorReviews from './EducatorReviews';
import EducatorDetailModal from './Modals/EducatorDetailModal';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import styles from './styles';
import {
  useGetCourses,
  useGetUserCertificates,
  useGetUserReviews,
  useGetUserSpecialties,
  useGetUsers,
} from '../CourseList/hook';
import {getColor} from '~/utils/helper/theme.methods';
import {TabsPadder} from '~/components/atoms/Header/TabsPadder';

const InstructorProfile = ({
  joinDate = true,
  yearsOfExperience = true,
  socialMedia = true,
  certificates = true,
  rateReview = true,
}) => {
  const {params} = useRoute();

  const [visible, setVisible] = useState(false);

  const {data: courseData, isLoading: courseLaoding}: any = useGetCourses({
    where: {course: {userId: {eq: params?.id}}},
    order: [{course: {createdDate: 'DESC'}}],
  });

  const {data: userData, isLoading: userLaoding}: any = useGetUsers({
    where: {id: {eq: params?.id}},
  });

  const {data: specialityData, isLoading: specialityLaoding}: any =
    useGetUserSpecialties({
      userId: params?.id,
    });

  const {data: certificateData, isLoading: certificateLaoding}: any =
    useGetUserCertificates({
      userId: params?.id,
    });

  const {
    data: reviews,
    isLoading: reviewsLaoding,
    fetchNextPage,
    hasNextPage,
  } = useGetUserReviews({
    targetUserId: params?.id,
    where: {
      review: {
        and: [{parentId: {eq: null}}, {targetUserId: {eq: params?.id}}],
      },
    },
    order: [{review: {createdDate: 'DESC'}}],
  });

  const icons = useMemo(
    () => (
      <VStack style={styles.rotation}>
        <MoreIconSet onPress={() => setVisible(true)} />
      </VStack>
    ),
    [],
  );

  const TabsHeader = useCallback(() => {
    return (
      <EducatorProfile
        data={userData?.pages[0]}
        joinDate={joinDate}
        yearsOfExperience={yearsOfExperience}
      />
    );
  }, [userData]);

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

  return courseLaoding ||
    userLaoding ||
    specialityLaoding ||
    certificateLaoding ||
    reviewsLaoding ? (
    <LoadIndicator />
  ) : (
    <Fragment>
      <TabsPadder />
      <Header title="Instructor’s profile" hasBack={true}>
        {icons}
      </Header>
      <Tabs.Container
        renderHeader={TabsHeader}
        headerContainerStyle={styles.tabContainer}
        lazy
        renderTabBar={TabBarComponent}>
        <Tabs.Tab name="About" label="About">
          <AboutEducator
            data={userData?.pages[0]}
            speciality={specialityData?.pages}
            certificate={certificateData?.pages}
            socialMedia={socialMedia}
            certificates={certificates}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Courses" label="Courses">
          <EducatorCources data={courseData?.pages} />
        </Tabs.Tab>
        <Tabs.Tab name="Review" label="Review">
          <EducatorReviews
            data={reviews?.pages}
            educatorId={params?.id}
            educatorRate={userData?.pages[0]}
            onLoadMore={() => fetchNextPage()}
            hasNextPage={hasNextPage}
            rateReview={rateReview}
          />
        </Tabs.Tab>
      </Tabs.Container>
      <EducatorDetailModal
        item={userData?.pages[0]}
        isVisible={visible}
        onClose={() => setVisible(false)}
      />
    </Fragment>
  );
};

export default InstructorProfile;
