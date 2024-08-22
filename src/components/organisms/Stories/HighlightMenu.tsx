import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  CustomActionSheet,
  Divider,
  EditIconSet,
  Layer,
  LoadIndicator,
  TrashIconSet,
  Typography,
  View,
  useNavigate,
} from '~/components';
import {useRemoveFromHighlight} from './hooks';
import {useQueryClient} from 'react-query';
import {getColor} from '~/utils/helper/theme.methods';

const HighlightMenu = ({
  item,
  isVisible,
  onClose,
  onPauseTimeline,
  onPressOut,
  highlightId,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  onPauseTimeline: any;
  onPressOut: any;
  highlightId?: number;
}) => {
  const {mutate, isLoading} = useRemoveFromHighlight();
  const queryClient = useQueryClient();
  const onRemoveFromHighlight = () => {
    mutate(
      {storyId: item?.id, highlightId},
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries(['getHighlights'], {exact: false});
          queryClient.invalidateQueries(['getHighlightStories'], {
            exact: false,
          });
          onPressOut?.();
        },
      },
    );
  };

  const {navigateWithName, navigation} = useNavigate();
  const onEditHighlight = () => {
    onClose();
    navigateWithName('EditHighlight', {highlightId});
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {isLoading && <LoadIndicator />}
        <Layer>
          <TouchableOpacity
            style={styles.touchableTop}
            onPress={onRemoveFromHighlight}>
            <TrashIconSet color={getColor({color: 'error.600'})} />
            <Typography color={'error.600'} style={styles.text}>
              Remove From Highlight
            </Typography>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={onEditHighlight}
            style={styles.touchableBottom}>
            <EditIconSet />
            <Typography style={styles.text}>Edit Highlight</Typography>
          </TouchableOpacity>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};
export default HighlightMenu;

const styles = StyleSheet.create({
  touchableBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 0,
  },
  touchableTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 16,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  text: {marginLeft: 8, fontWeight: 'bold'},
});
