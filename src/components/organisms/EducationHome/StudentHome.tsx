import {ScrollView, StyleSheet} from 'react-native';
import React, {Fragment, useMemo, useState} from 'react';
import {
  FlashIconSet,
  HStack,
  Image,
  NotificationIconSet,
  Typography,
  VStack,
  View,
  getColor,
  scale,
  useAuth,
  useNavigate,
} from '~/components';
import HorizontalProductsList from './HorizontalProductsList';
import HorizontalEducatorsList from './HorizontalEducatorsList';
import VerticalProductsList from './VerticalProductsList';
import HorizontalCategoryList from './HorizontalCategoryList';
import {TouchableOpacity} from 'react-native';
import ArrowUpSolid from '~/assets/iconset/Arrow/arrow-up-solid';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetCategories} from '~/components/molecules/ItemSearch/hook';
import {useGetCourses, useGetStreak, useGetUsers} from '../CourseList/hook';
import {useGetUnreadNotifQuery} from '~/components/molecules/HomeHeader/hooks';
import EducationLoagoIconSet from '~/assets/icons/CustomIcons/EducationLogo.icon';
import {model} from '~/data/model';

const StudentHome = () => {
  const {navigateWithName} = useNavigate();

  const scrollViewRef: any = React.createRef();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const {user} = useAuth();

  const {data: categoryData, isLoading: categoryLoading}: any =
    useGetCategories({
      key: 'educationCategories',
    });

  const {data: forYouData}: any = useGetCourses({
    where: {
      course: {
        category: {in: JSON.parse(user?.favoriteCategories ?? '[]')},
        isDraft: {eq: false},
      },
    },
  });

  const {data: educatorData, isLoading: educatorLoading}: any = useGetUsers({
    where: {userRole: {eq: 'educator'}},
  });

  const {data: topRateData, isLoading: rateLaoding}: any = useGetCourses({
    where: {course: {isDraft: {eq: false}}},
    order: [{course: {rateAverage: 'DESC'}}],
  });

  const {data: featuredData, isLoading: featuredLaoding}: any = useGetCourses({
    where: {course: {isFeatured: {eq: true}, isDraft: {eq: false}}},
  });

  const {data: certificationData, isLoading: certificateLaoding}: any =
    useGetCourses({
      where: {course: {hasCertificate: {eq: true}, isDraft: {eq: false}}},
    });

  let category;

  category = JSON.parse(
    categoryData?.staticConfig_getStaticConfig?.result.value || '[]',
  );

  const {data} = useGetStreak();

  const {data: notificationData} = useGetUnreadNotifQuery({
    where: {isRead: {eq: false}},
  });
  const hasNotif =
    notificationData?.notification_getNotifications?.result?.totalCount > 0;

  const icons = useMemo(
    () => (
      <HStack space={'5'}>
        <VStack>
          <Typography fontWeight={'500'} lineHeight={17} style={styles.streak}>
            {data?.streak_getStreak?.result?.current?.dayCount}
          </Typography>
          <FlashIconSet
            color={getColor({
              color:
                data?.streak_getStreak?.result?.current?.dayCount === 0
                  ? 'gray.500'
                  : 'rate.100',
            })}
            fill={getColor({
              color:
                data?.streak_getStreak?.result?.current?.dayCount === 0
                  ? 'gray.500'
                  : 'rate.100',
            })}
            onPress={() => navigateWithName('Streak')}
          />
        </VStack>
        <VStack>
          <NotificationIconSet
            onPress={() => navigateWithName('notification')}
          />
          {hasNotif && <View style={styles.badge} />}
        </VStack>
      </HStack>
    ),
    [data, notificationData],
  );

  const logo = useMemo(
    () => (
      <VStack>
        {model?.metaData?.logo ? (
          <View style={styles.logo}>
            <Image
              resizeMode="cover"
              style={styles.img}
              src={model?.metaData?.logo}
            />
          </View>
        ) : (
          <EducationLoagoIconSet />
        )}
      </VStack>
    ),
    [],
  );

  const {} = useHeader({
    icons,
    logo,
    hasTitle: false,
  });

  return (
    <Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          if (offsetY > 100) {
            setShowScrollToTop(true);
          } else {
            setShowScrollToTop(false);
          }
        }}>
        <HorizontalCategoryList
          title={'Categories'}
          data={category}
          loading={categoryLoading}
          onClickSeeAll={() => {
            navigateWithName('InterestsScreen', {
              entity: 'educationCategories',
              multiSelect: false,
            });
          }}
        />
        {forYouData?.pages?.length > 0 && (
          <HorizontalProductsList
            title={'For You'}
            data={forYouData?.pages}
            onClickSeeAll={() => {
              navigateWithName('CourseList', {
                data: 'For You',
                filter: `{where: {category: {in: ${JSON.parse(
                  user?.favoriteCategories ?? '[]',
                )}},isDraft: {eq: false}}`,
              });
            }}
          />
        )}
        <HorizontalProductsList
          title={'Top Rated Courses'}
          data={topRateData?.pages}
          loading={rateLaoding}
          onClickSeeAll={() => {
            navigateWithName('CourseList', {
              data: 'Top Rated Courses',
              filter: `{
                where:{course:{isDraft: {eq: false}},
              order: [{rateAverage: 'DESC'}],
            }`,
            });
          }}
        />
        <HorizontalEducatorsList
          title={'Instructors'}
          data={educatorData?.pages}
          loading={educatorLoading}
          onClickSeeAll={() => {
            navigateWithName('Instructors');
          }}
        />
        {featuredData?.pages?.length > 0 && (
          <VerticalProductsList
            title={'Featured Courses'}
            data={featuredData?.pages?.slice(0, 4)}
            loading={featuredLaoding}
            onClickSeeAll={() =>
              navigateWithName('CourseList', {
                data: 'Featured Courses',
                filter: `{
              where: {course: {isFeatured: {eq: true},isDraft: {eq: false}}},
            }`,
              })
            }
          />
        )}
        {certificationData?.pages?.length > 0 && (
          <HorizontalProductsList
            title={'Get Certification'}
            data={certificationData?.pages}
            loading={certificateLaoding}
            onClickSeeAll={() => {
              navigateWithName('CourseList', {
                data: 'Certification',
                filter: `{ where: {course: {hasCertificate: {eq: true},isDraft: {eq: false}}},}`,
              });
            }}
          />
        )}
      </ScrollView>
      {showScrollToTop && (
        <TouchableOpacity
          onPress={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({y: 0, animated: true});
            }
          }}
          style={styles.scrollBTN}>
          <ArrowUpSolid />
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default StudentHome;

const styles = StyleSheet.create({
  scrollBTN: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 30,
    borderRadius: 100,
    shadowColor: getColor({color: 'gray.400'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: getColor({color: 'background.500'}),
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 3,
    width: 8,
    height: 8,
    backgroundColor: getColor({color: 'error.500'}),
    borderRadius: 100,
  },

  streak: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    fontSize: 10,
  },

  img: {
    width: undefined,
    aspectRatio: 1,
    height: scale(70) * 0.26,
  },

  logo: {
    width: scale(70),
    height: scale(70) * 0.26,
  },
});
