import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CloseIconSet, SearchNormalIconSet} from '~/assets/iconset';
import {Image, Typography, getColor, useNavigate} from '~/components/elemental';
import {scale} from '~/utils/methods';
import {useDeleteSearchHistoryMutation} from './hooks';
import {useQueryClient} from 'react-query';
import {useCreateSearchHistory} from '~/components/molecules/ItemSearch/hook';

const SearchHistoryItem = ({
  item,
  index,
  type,
  hasClose = false,
  onPress,
  navigateWithName,
}: {
  item: any;
  index: number;
  type?: any;
  hasClose?: boolean;
  onPress?: (item?: any) => void;
  navigateWithName?: any;
}) => {
  const userJSON = useMemo(() => {
    try {
      if (item?.type === 'USER_ACCOUNT' && item?.value?.length > 3) {
        return JSON.parse(item?.value);
      } else if (type === 'USER_ACCOUNT') return item;
      else return {};
    } catch (error) {
      return item?.value;
    }
  }, [item]);

  const queryClient = useQueryClient();
  const {mutate, isLoading} = useDeleteSearchHistoryMutation();
  const onDeletePress = () => {
    mutate(
      {searchHistoryId: item?.id},
      {
        onSuccess: data => {
          if (data?.searchHistory_deleteSearchHistory?.status?.code === 1)
            queryClient.invalidateQueries(
              ['searchHistory_getSearchHistories'],
              {exact: false},
            );
        },
      },
    );
  };

  const {mutate: createMutate} = useCreateSearchHistory();
  const {navigation, navigateWithName: navigateName} = useNavigate();
  const onItemPress = () => {
    createMutate(
      {input: {type: item?.type, value: item?.value}},
      {
        onSuccess: data =>
          queryClient.invalidateQueries(['searchHistory_getSearchHistories'], {
            exact: false,
          }),
        onError: error => {},
      },
    );
    if (onPress) onPress(item);
    else {
      if (item?.type === 'ALL') {
        navigation.pop();
        navigateWithName
          ? navigateWithName(
              'SearchExplore',
              {
                searchInput: item?.value,
              },
              {push: true},
            )
          : navigateName(
              'SearchExplore',
              {
                searchInput: item?.value,
              },
              {push: true},
            );
      } else if (item?.type === 'HASHTAG') {
        navigateWithName('SearchTag', {tag: item?.value});
      } else if (item?.type === 'USER_ACCOUNT') {
        navigateWithName('profile', {userId: userJSON?.id});
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={onItemPress}>
        <View style={styles.iconContainer}>
          {item?.type === 'ALL' ? (
            <SearchNormalIconSet
              width={scale(24)}
              height={scale(24)}
              color="gray.800"
            />
          ) : item?.type === 'USER_ACCOUNT' || type === 'USER_ACCOUNT' ? (
            <Image
              src={userJSON?.photoUrl}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <Typography fontSize="2xl" color="gray.800">
              #
            </Typography>
          )}
        </View>
        {item?.type != 'USER_ACCOUNT' && type != 'USER_ACCOUNT' ? (
          <Typography
            color="gray.800"
            fontSize="md"
            fontWeight="500"
            flexShrink={1}>
            {item?.value}
          </Typography>
        ) : (
          <View>
            <Typography color="gray.800" fontSize="md" fontWeight="500">
              {userJSON.fullname ?? userJSON?.fullName}
            </Typography>
            <Typography color="gray.500" fontSize="sm" fontWeight="400">
              {userJSON.username}
            </Typography>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.flex1} />
      {hasClose ? (
        <>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <CloseIconSet onPress={onDeletePress} />
          )}
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchHistoryItem;

const iconSize = scale(54);
const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {flexDirection: 'row', alignItems: 'center'},
  iconContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: getColor({color: 'gray.400'}),
    borderWidth: 1,
    marginEnd: 8,
    overflow: 'hidden',
  },
  avatar: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
  },
});
