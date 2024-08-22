import {Pressable} from 'native-base';
import React, {memo, useState} from 'react';
import {
  ArrowDownIcon,
  ArrowUpIconSet,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import {Tabs} from 'react-native-collapsible-tab-view';
import EducationVerticalItem from '~/components/molecules/EducationVerticalItem';
import styles from './styles';
import EducationEmptyState from '~/assets/icons/CustomIcons/EducationEmptyState.icon';

const RenderItem = ({item, onItemPress}) => (
  <EducationVerticalItem
    course={item}
    style={styles.mr}
    onCoursePress={onItemPress}
  />
);

const ListEmptyComponent = () => (
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

const ListFooterComponent = ({load, setLoad}) => (
  <Pressable
    alignSelf={'center'}
    justifyContent={'center'}
    mt="6"
    onPress={() => setLoad(!load)}>
    <Typography
      fontSize="sm"
      lineHeight={19}
      fontWeight={'500'}
      color={getColor({color: 'secondary.500'})}>
      {load ? 'Load less' : 'Load more'}
    </Typography>
    <VStack alignSelf={'center'} mt="2">
      {load ? (
        <ArrowUpIconSet color={getColor({color: 'secondary.500'})} />
      ) : (
        <ArrowDownIcon color={getColor({color: 'secondary.500'})} />
      )}
    </VStack>
  </Pressable>
);

const EducatorCources = ({data}) => {
  const {navigateWithName} = useNavigate();
  const [load, setLoad] = useState(false);

  return (
    <Tabs.FlatList
      data={load ? data : data.slice(0, 3)}
      keyExtractor={item => item?.course?.id}
      contentContainerStyle={styles.TabStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <RenderItem
          item={item}
          onItemPress={() =>
            navigateWithName('CourseDetails', {id: item?.course?.id})
          }
        />
      )}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        data?.length > 3 ? (
          <ListFooterComponent load={load} setLoad={setLoad} />
        ) : (
          () => null
        )
      }
    />
  );
};
export default memo(EducatorCources);
