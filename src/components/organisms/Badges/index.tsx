import {StyleSheet} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {BookIconSet, FlashIconSet, FlatList, LoadIndicator} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import {useGetUserBadges} from '../CourseList/hook';
import BadgeVerticalItem from '~/components/molecules/BadgeVerticalItem';
import MedalSolidIconSet from '~/assets/iconset/Users/medalSolid';
import TaskSquareSolidIconSet from '~/assets/iconset/Files/task-squareSolid';
import {getColor} from '~/utils/helper/theme.methods';
import CalendareSolidIconSet from '~/assets/iconset/Time/calendarSolid';
import MessageSolidIconSet from '~/assets/iconset/Files/messageSolid';
import MessagesSolidIconSet from '~/assets/iconset/Files/messagesSolid';

export const BadgeList = [
  {
    color: 'primary.200',
    type: 'STARTER',
    icon: <MedalSolidIconSet />,
    title: 'Starter Badge',
    desc: 'Awarded for completing the first lesson',
  },
  {
    color: 'primary.200',
    type: 'COMPLETIST',
    icon: <BookIconSet solid color={'gray.300'} width={24} height={24} />,
    title: 'Completion Badge',
    desc: 'Awarded for completing all lessons within a course.',
  },
  {
    color: 'gray.300',
    type: 'SKILL_MASTERY',
    icon: <TaskSquareSolidIconSet />,
    title: 'Skill Mastery badge',
    desc: 'Awarded for passing their first quiz within the application',
  },
  {
    color: 'gray.300',
    type: 'STREAK',
    icon: (
      <FlashIconSet
        color={getColor({color: 'gray.50'})}
        fill={getColor({color: 'gray.50'})}
        width={24}
        height={24}
      />
    ),
    title: 'Streak Badge',
    desc: 'Awarded for maintaining a consecutive streak of daily or weekly usage. (set it to 7 days)',
  },
  {
    color: 'gray.300',
    type: 'DILIGENT',
    icon: <CalendareSolidIconSet />,
    title: 'Diligent badge',
    desc: 'Awarded for consistent engagement over an extended period.(1 month of streak)',
  },
  {
    color: 'gray.300',
    type: 'ACHIEVEMENT',
    icon: <CalendareSolidIconSet />,
    title: 'Achievement badge',
    desc: 'Awarded for 3 months of streak',
  },
  {
    color: 'gray.300',
    type: 'MILESTONE',
    icon: <BookIconSet solid color={'gray.300'} width={24} height={24} />,
    title: 'Milestone badge',
    desc: 'Awarded for reaching a specific milestone in the app (e.g., completing 10 courses)',
  },

  {
    color: 'gray.300',
    type: 'TOP_PERFORMER',
    icon: <BookIconSet solid color={'gray.300'} width={24} height={24} />,
    title: 'Top Performer badge',
    desc: 'Awarded for outstanding performance in assessments or quizzes.(getting a score above 90 in 10 courses)',
  },

  {
    color: 'gray.300',
    type: 'COMMUNITY_CONTRIBUTOR',
    icon: <MessageSolidIconSet width={24} height={24} />,
    title: 'Community Contributor badge',
    desc: 'Awarded for leaving reviews on courses participated ( 1 course)',
  },

  {
    color: 'gray.300',
    type: 'INSIGHTFUL_REVIEWER',
    icon: <MessagesSolidIconSet width={24} height={24} />,
    title: 'Insightful Reviewer badge',
    desc: 'Awarded for actively leaving 5 reviews on courses participates',
  },
];

const Badges = () => {
  const user = useAuthStore(state => state?.user);

  const [sortData, setSortData] = useState([]);

  const {
    data: userBadges,
    refetch,
    isRefetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  }: any = useGetUserBadges({userId: user?.id});

  const {} = useHeader({
    hasBack: true,
    title: {
      children: 'Badges',
      fontWeight: 'bold',
      fontSize: 'lg',
    },
  });

  useEffect(() => {
    if (userBadges) {
      const array = userBadges?.pages?.map(item => item?.badgeType) ?? [];
      BadgeList.sort((a, b) => {
        const indexA = array?.indexOf(a.type);
        const indexB = array?.indexOf(b.type);

        if (indexA !== -1 && indexB !== -1) {
          return indexB - indexA;
        }

        if (indexA !== -1) {
          return -1;
        }
        if (indexB !== -1) {
          return 1;
        }

        return 0;
      });

      setSortData(BadgeList);
    }
  }, [userBadges]);

  const renderItem = useCallback(
    ({item}) => (
      <BadgeVerticalItem
        item={item}
        style={styles.margin}
        userBadge={userBadges?.pages}
        onItemPress={() => {}}
      />
    ),
    [userBadges],
  );

  return (
    <Fragment>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortData}
          refreshing={isRefetching}
          onRefresh={refetch}
          scrollEventThrottle={16}
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

export default Badges;

const styles = StyleSheet.create({
  margin: {marginHorizontal: 2},
});
