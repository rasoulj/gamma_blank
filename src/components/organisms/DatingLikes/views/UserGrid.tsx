import React, {useMemo} from 'react';

import {
  Box,
  LoadIndicator,
  Pressable,
  Typography,
  deviceWidth,
  useNavigate,
} from '~/components';
import MasonryList from '@react-native-seoul/masonry-list';
import {StyleSheet} from 'react-native';
import {DatingUser} from '../../DatingHome/models/user';
import {Image, ZStack} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import useAuthStore from '~/stores/authStore';
import {useGetMatches} from '../hooks';
import {
  DefaultFilter,
  getDatingUserFromAnswers,
} from '../../DatingHome/hooks/DatingHome.hook';
import EmptyResult from '../../SocialSearch/EmptyResult';
import EmptyCalendar from '~/assets/iconset/Dating/EmptyCalendar';
import datingLikesStore from '~/stores/datingLikesStore';
import dayjs from 'dayjs';

const _gradColors = [
  'transparent',
  'rgba(22, 18, 15, 0.30)',
  'rgba(22, 18, 15, 0.00)',
  'rgba(22, 18, 15, 0.70)',
];

const subtractDate = (value, unit: dayjs.ManipulateType) =>
  dayjs().subtract(value, unit).format('YYYY-MM-DD');

function UserView({
  user,
  index,
  item,
}: {
  user: DatingUser;
  index: number;
  item: any;
}): JSX.Element {
  const {navigateWithName} = useNavigate();
  const onPress = () =>
    navigateWithName('UserDetailView', {
      user,
      type: item?.matchStatus === 'ACCEPTED' ? 0 : 1,
      matchId: item?.id,
      requestedUser: user,
    });

  return (
    <Pressable onPress={onPress}>
      <ZStack style={styles.backBox}>
        <Box style={styles.imageBox}>
          <Image
            alt=""
            key={user?.address}
            style={styles.image}
            source={{uri: user?.avatar[0]}}
          />
        </Box>

        <LinearGradient style={styles.grad} colors={_gradColors}>
          <Typography
            fontWeight={'700'}
            fontSize="sm"
            color={'#fff'}
            style={styles.label}>
            {user.name}, {user.age}
          </Typography>
        </LinearGradient>
      </ZStack>
    </Pressable>
  );
}

export default function UserGrid({
  type = 'all',
}: {
  type?: 'all' | 'new' | 'matched';
}): JSX.Element {
  const user = useAuthStore(state => state.user);
  const {applyedFilter} = datingLikesStore(state => state);

  const filterQuery = useMemo(() => {
    let filterArray = [];
    if (
      applyedFilter.age != DefaultFilter.age &&
      applyedFilter.age.length === 2
    ) {
      let dob1 = subtractDate(applyedFilter.age[0], 'year');
      let dob2 = subtractDate(applyedFilter.age[1], 'year');
      filterArray.push({requestedByUser: {dateOfBirth: {lte: dob1}}});
      filterArray.push({requestedByUser: {dateOfBirth: {gte: dob2}}});
    }
    if (applyedFilter.height != DefaultFilter.height) {
      filterArray.push({requestedByUser: {height: {gte: applyedFilter[0]}}});
      filterArray.push({requestedByUser: {height: {lte: applyedFilter[1]}}});
    }
    if (
      applyedFilter.genderOption != DefaultFilter.genderOption &&
      applyedFilter.genderOption != 'Everyone'
    ) {
      let gender = applyedFilter.genderOption;
      filterArray.push({
        requestedByUser: {
          gender: {
            eq:
              gender === 'Man'
                ? 'MALE'
                : gender == 'Woman'
                ? 'FEMALE'
                : 'OTHERS',
          },
        },
      });
    }
    return filterArray;
  }, [applyedFilter]);

  const {data, isLoading, hasNextPage, fetchNextPage, refetch} = useGetMatches({
    where:
      type === 'matched'
        ? {
            and: [{matchStatus: {eq: 'ACCEPTED'}}, ...filterQuery],
          }
        : {
            and: [
              {targetUserId: {eq: user?.id}},
              {matchStatus: {neq: 'REJECTED'}},
              ...filterQuery,
            ],
          },
    order: type === 'new' ? [{createdDate: 'DESC'}] : undefined,
  });

  const auth = useAuthStore();
  const renderItem = ({item, i}) => {
    const currentUser =
      item?.targetUserId === user?.id
        ? item?.requestedByUser
        : item?.targetUser;
    const itemUser = getDatingUserFromAnswers(currentUser, auth);
    return <UserView index={i} user={itemUser as DatingUser} item={item} />;
  };

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <MasonryList
          style={styles.margins}
          numColumns={2}
          data={data?.pages ?? []}
          renderItem={renderItem}
          keyExtractor={(_, i) => `key${i}`}
          ListEmptyComponent={
            <EmptyResult
              text="No users were found with the current filters.  Please adjust your filters and try again."
              EmptySvg={EmptyCalendar}
            />
          }
          onEndReached={onEndReached}
          onRefresh={refetch}
          refreshing={false}
          contentContainerStyle={styles.flex1}
        />
      )}
    </>
  );
}

const width = (deviceWidth - 62) / 2;
const height = 1.5 * width;

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    height: '100%',
    borderRadius: 10,
  },

  backBox: {
    flex: 1,
    height,
    margin: 3,
  },

  margins: {
    marginHorizontal: 20,
    marginTop: 10,
  },

  label: {
    position: 'absolute',
    left: 15,
    bottom: 20,
  },

  grad: {
    width: '100%',
    height: height,
    borderRadius: 15,
  },

  flex1: {flex: 1},
});
