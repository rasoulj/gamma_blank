import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Divider,
  LoadIndicator,
  Typography,
  getColor,
  useToast,
} from '~/components/elemental';
import {
  ConfirmationActionSheet,
  TagUserIconSet,
  TrashIconSet,
  useNavigate,
} from '~/components';
import {useDeleteStoryMutation} from './hooks';
import {useQueryClient} from 'react-query';
import AddToHighlightModal from './AddToHighlightModal';
import CreateHighlightActionSheet from './CreateHighlightActionSheet';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';

const StoryItemMyMenu = ({
  item,
  isVisible,
  onClose,
  onPauseTimeline,
  onPressOut,
  onAddToHighlight,
  counter,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  onPauseTimeline: any;
  onPressOut: any;
  onAddToHighlight: () => void;
  counter?: number;
}) => {
  const [visibleAddHighlight, setVisibleAddHighlight] = useState(false);
  const [visibleCreateHighlight, setVisibleCreateHighlight] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);
  const {handleCheckElementExist} = useSocialTypesConfig();

  const onDeletePress = () => {
    setVisibleDeleteConfirm(true);
  };
  const {mutate: deleteMutate, isLoading: deleteLoading} =
    useDeleteStoryMutation();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {navigation} = useNavigate();
  const onDeleteStory = () => {
    deleteMutate(
      {storyId: item?.id},
      {
        onSuccess: data => {
          if (data?.story_deleteStory?.code === 1) {
            queryClient.invalidateQueries(['story_getStories'], {exact: false});
            queryClient.invalidateQueries(['getStories'], {exact: false});
            queryClient.invalidateQueries(['story_getLastStoriesOfUsers'], {
              exact: false,
            });
            queryClient.invalidateQueries(['story_getMyLastStoriesOfUsers'], {
              exact: false,
            });
            toast({message: data?.story_deleteStory?.value});
            onClose();
            onPressOut?.();
            if (counter < 2) {
              navigation.goBack();
            }
          } else {
            toast({message: data?.story_deleteStory?.value});
            onPressOut?.();
          }
        },
        onError: errorData => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  const onCloseMenu = () => {
    onPressOut();
    onClose();
  };
  const onCloseAddHighlightModal = () => {
    setVisibleAddHighlight(false);
    onPressOut();
  };
  const onPressNewHighlight = () => {
    setVisibleCreateHighlight(true);
    setVisibleAddHighlight(false);
  };
  const onCloseNewHighlight = () => {
    setVisibleCreateHighlight(false);
    onCloseAddHighlightModal();
  };
  const onPressAddToHighlight = () => {
    setVisibleAddHighlight(true);
    onClose();
  };
  const onCloseDeleteConfirm = () => setVisibleDeleteConfirm(false);

  if (visibleDeleteConfirm)
    return (
      <ConfirmationActionSheet
        isOpen={visibleDeleteConfirm}
        onClose={onCloseDeleteConfirm}
        onConfirmPress={onDeleteStory}
        description="Are you sure you want to delete this story"
        isLoading={deleteLoading}
      />
    );

  if (visibleAddHighlight)
    return (
      <AddToHighlightModal
        onClose={onCloseAddHighlightModal}
        isVisible={visibleAddHighlight}
        onPressNewHighlight={onPressNewHighlight}
        item={item}
      />
    );
  else if (visibleCreateHighlight)
    return (
      <CreateHighlightActionSheet
        onClose={onCloseNewHighlight}
        isVisible={visibleCreateHighlight}
        storyItem={item}
      />
    );
  return (
    <CustomActionSheet
      isVisible={isVisible}
      onClose={onCloseMenu}
      key={`${item?.id ?? 1}`}>
      {deleteLoading && <LoadIndicator />}
      <View>
        <TouchableOpacity style={styles.touchable} onPress={onDeletePress}>
          <TrashIconSet color={getColor({color: 'error.500'})} />
          <Typography
            fontWeight="bold"
            marginLeft={8}
            color={getColor({color: 'error.500'})}>
            Delete
          </Typography>
        </TouchableOpacity>
        {handleCheckElementExist('highlight') && (
          <>
            <Divider />
            <TouchableOpacity
              style={styles.touchable}
              onPress={onPressAddToHighlight}>
              <TagUserIconSet />
              <Typography marginLeft={8} fontWeight="bold">
                Add to highlight
              </Typography>
            </TouchableOpacity>
          </>
        )}
      </View>
    </CustomActionSheet>
  );
};

export default StoryItemMyMenu;

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
});
