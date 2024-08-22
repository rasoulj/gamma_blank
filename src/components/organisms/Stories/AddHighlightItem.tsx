import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {
  AddIconSet,
  HStack,
  Image,
  TickIconSet,
  Typography,
  VStack,
  getColor,
  scale,
  useToast,
} from '~/components/elemental';
import {ActivityIndicator} from 'react-native';
import {useAddToHighlightMutation, useRemoveFromHighlight} from './hooks';
import {useQueryClient} from 'react-query';

const AddHighlightItem = ({
  highlightItem,
  storyId,
  isAdded,
  onClose,
}: {
  highlightItem: string;
  storyId?: number;
  isAdded: boolean;
  onClose: any;
}) => {
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {mutate: addMutate, isLoading} = useAddToHighlightMutation();
  const onAddPress = () => {
    addMutate(
      {storyId, highlightId: highlightItem?.id},
      {
        onSuccess: data => {
          if (data?.highlight_addToHighlight?.code === 1) {
            queryClient.invalidateQueries(['getHighlights'], {exact: false});
            onClose();
            toast({
              message: 'Story successfully added to highlights',
              type: 'success',
            });
          }
        },
      },
    );
  };

  const {mutate: removeMutate, isLoading: removeLoading} =
    useRemoveFromHighlight();
  const onRemoveFromHighlight = () => {
    removeMutate(
      {storyId, highlightId: highlightItem?.id},
      {
        onSuccess: data => {
          if (data?.highlight_removeFromHighlight?.code === 1) {
            queryClient.invalidateQueries(['getHighlights'], {exact: false});
            onClose();
            toast({
              message: 'Story successfully removed from highlights',
              type: 'success',
            });
          }
        },
      },
    );
  };

  return (
    <HStack alignItems="center" space="8px">
      <Image
        style={styles.image}
        resizeMode="cover"
        src={highlightItem?.photoUrl}
      />
      <Typography
        color="gray.800"
        fontSize="md"
        flexShrink="1"
        fontWeight="600"
        numberOfLines={1}>
        {highlightItem?.name}
      </Typography>
      <VStack flex="1" />
      <TouchableOpacity
        style={[
          styles.addCircle,
          isAdded && {
            backgroundColor: getColor({color: 'primary.500'}),
          },
        ]}
        onPress={isAdded ? onRemoveFromHighlight : onAddPress}>
        {isLoading || removeLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {isAdded ? (
              <TickIconSet color={getColor({color: 'background.200'})} />
            ) : (
              <AddIconSet color={getColor({color: 'primary.500'})} />
            )}
          </>
        )}
      </TouchableOpacity>
    </HStack>
  );
};

export default memo(AddHighlightItem);

const styles = StyleSheet.create({
  image: {width: scale(60), height: scale(60), borderRadius: 10},
  addCircle: {
    borderWidth: 2,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(40) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: getColor({color: 'primary.500'}),
  },
});
