import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CustomActionSheet,
  Divider,
  EditIconSet,
  LoadIndicator,
  TrashIconSet,
  useToast,
} from '~/components';
import {
  Image,
  Typography,
  VStack,
  scale,
  useNavigate,
  getColor,
} from '~/components/elemental';
import {useDeleteHighlightMutation} from './hooks';
import {useQueryClient} from 'react-query';

const itemSize = scale(60);
const radius = '15';

const HighlightItem = ({item, index, userId}) => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);

  const onCloseMenu = () => setVisibleMenu(false);

  const {navigateWithName} = useNavigate();
  const onItemPress = () =>
    navigateWithName('ProfileHighlights', {
      currentIndex: index,
      userId,
    });
  const onItemLongPress = () => {
    setVisibleMenu(true);
  };

  return (
    <>
      <VStack w={itemSize} space="2">
        <VStack
          borderWidth="2"
          h={itemSize}
          w={itemSize}
          borderColor={item?.hasNotSeen ? '#006194' : 'gray.400'}
          overflow="hidden"
          borderRadius={radius}
          justifyContent="center"
          alignItems="center">
          <TouchableOpacity onPress={onItemPress} onLongPress={onItemLongPress}>
            <Image
              src={item?.highlight?.photoUrl}
              style={styles.img}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </VStack>
        <Typography numberOfLines={1} fontSize="xs" alignSelf="center">
          {item?.highlight?.name}
        </Typography>
      </VStack>
      {visibleMenu && (
        <HighlightMenu
          isVisible={visibleMenu}
          item={item}
          onClose={onCloseMenu}
        />
      )}
    </>
  );
};
export default memo(HighlightItem);

const HighlightMenu = ({isVisible, onClose, item}) => {
  const {navigateWithName} = useNavigate();
  const onEditPress = () => {
    onClose();
    navigateWithName('EditHighlight', {item});
  };

  const {mutate, isLoading} = useDeleteHighlightMutation();
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const onRemovePress = () => {
    mutate(
      {highlightId: item?.highlight?.id},
      {
        onSuccess: data => {
          if (data?.highlight_deleteHighlight?.code === 1) {
            onClose();
            queryClient.invalidateQueries(['getHighlights'], {exact: false});
          } else {
            toast({message: data?.highlight_deleteHighlight?.value});
          }
        },
        onError: () => {
          onClose();
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View>
        {isLoading && <LoadIndicator />}
        <TouchableOpacity style={styles.touchableTop} onPress={onRemovePress}>
          <TrashIconSet color={getColor({color: 'error.500'})} />
          <Typography color={'error.500'} style={styles.text}>
            Delete highlight
          </Typography>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={onEditPress}>
          <View style={styles.touchableBottom}>
            <EditIconSet />
            <Typography style={styles.text}>Edit highlight</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </CustomActionSheet>
  );
};

const styles = StyleSheet.create({
  img: {width: itemSize, height: itemSize},
  touchableBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 16,
  },
  touchableTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 0,
  },
  text: {marginLeft: 8, fontWeight: 'bold'},
});
