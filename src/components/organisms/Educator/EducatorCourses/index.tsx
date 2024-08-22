import {StyleSheet} from 'react-native';
import React, {Fragment, useCallback, useMemo} from 'react';
import {
  CircleIcon,
  FlatList,
  HStack,
  LoadIndicator,
  NotificationIconSet,
  Typography,
  VStack,
  useNavigate,
} from '~/components';
import {useGetCourses} from '../../CourseList/hook';
import EducationEmptyState from '~/assets/icons/CustomIcons/EducationEmptyState.icon';
import EducatorCourseItem from '~/components/molecules/EducatorCourseItem';
import useAuthStore from '~/stores/authStore';
import {useGetUnreadNotifQuery} from '~/components/molecules/HomeHeader/hooks';
import useHeader from '~/components/elemental/hooks/use_header';

const EducatorCourses = () => {
  const user = useAuthStore(state => state?.user);

  const {navigateWithName} = useNavigate();

  const {
    data: courseData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  }: any = useGetCourses({
    where: {course: {user: {id: {eq: user?.id}}}},
    order: {course: {createdDate: 'DESC'}},
  });

  const {data} = useGetUnreadNotifQuery({
    where: {isRead: {eq: false}},
  });
  const hasNotif = data?.notification_getNotifications?.result?.totalCount > 0;

  const onNotificationPress = () => {
    navigateWithName('notification');
  };

  const icons = useMemo(
    () => (
      <HStack>
        <NotificationIconSet
          width={24}
          height={24}
          onPress={onNotificationPress}
        />
        {hasNotif && <CircleIcon size={2} color="error.500" marginLeft={-3} />}
      </HStack>
    ),
    [data],
  );

  const logo = useMemo(
    () => (
      <Typography
        fontSize="2xl"
        lineHeight={32}
        fontWeight={'700'}
        color={'gray.800'}>
        My Courses
      </Typography>
    ),
    [],
  );

  const {} = useHeader({icons, logo, hasTitle: false});

  const renderItem = useCallback(
    ({item}) => <EducatorCourseItem course={item} />,
    [],
  );

  const listEmptyComponent = () => (
    <VStack
      justifyContent={'center'}
      alignItems={'center'}
      flex={1}
      alignSelf={'center'}>
      <EducationEmptyState />
      <Typography style={styles.title} color={'gray.400'}>
        No Course Yet!
      </Typography>
    </VStack>
  );

  return (
    <Fragment>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          data={courseData?.pages}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </Fragment>
  );
};

export default EducatorCourses;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 20,
  },

  container: {flexGrow: 1, paddingBottom: 100},
});
