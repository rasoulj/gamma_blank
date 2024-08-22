import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  AddIconSet,
  FlatList,
  HStack,
  Typography,
  VStack,
  scale,
  useNavigate,
} from '~/components/elemental';
import {useGetHighlights} from './hooks';
import HighlightItem from './HighlightItem';
import useAuthStore from '~/stores/authStore';

const itemSize = scale(60);
const radius = '15';

const SectionHighlight = ({userId}) => {
  const currentUser = useAuthStore(state => state.user);
  const {data, isLoading} = useGetHighlights({
    userId,
    order: [{highlight: {createdDate: 'DESC'}}],
  });
  const {navigateWithName} = useNavigate();
  const onAddHighlightPress = () => {
    navigateWithName('AddHighlight');
  };
  const ListHeaderComponent = useCallback(() => {
    return (
      <TouchableOpacity onPress={onAddHighlightPress}>
        <VStack ml="5" space="1.5" mr="6">
          <VStack
            borderWidth="2"
            h={itemSize}
            w={itemSize}
            borderRadius={radius}
            borderColor={'gray.400'}
            justifyContent="center"
            alignItems="center">
            <AddIconSet color="gray.400" />
          </VStack>
          <Typography alignSelf="center" fontSize="xs">
            Add
          </Typography>
        </VStack>
      </TouchableOpacity>
    );
  }, []);

  const renderItem = useCallback(({item, index}) => {
    return <HighlightItem {...{item, index, userId}} />;
  }, []);

  return (
    <HStack>
      <FlatList
        data={data?.pages}
        ListHeaderComponent={
          currentUser?.id != userId ? undefined : ListHeaderComponent
        }
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        ItemSeparatorComponent={() => <VStack w="6" />}
        contentContainerStyle={
          currentUser?.id != userId ? styles.marginStart : undefined
        }
      />
    </HStack>
  );
};
export default SectionHighlight;

const styles = StyleSheet.create({
  marginStart: {marginStart: 20},
});
