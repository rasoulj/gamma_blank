import {FlatList, TouchableWithoutFeedback, View} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Box, Divider, Typography, getColor} from '~/components/elemental';
import {TouchableOpacity} from 'react-native';
const AlbumsSheet = forwardRef(
  (
    {
      data,
      onSelectItem,
    }: {
      data: any;
      onSelectItem?: (value) => any;
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    useImperativeHandle(
      ref,
      () => ({
        onClose: () => setIsVisible(false),
        onOpen: () => setIsVisible(true),
      }),
      [],
    );
    const renderItem = useCallback(({item, index}: any) => {
      const onPress = () => {
        onSelectItem?.(item?.title);
        onClose();
      };
      return (
        <TouchableOpacity onPress={onPress}>
          <Typography>{item?.title}</Typography>
        </TouchableOpacity>
      );
    }, []);
    const onClose = () => setIsVisible(false);
    return (
      <CustomActionSheet
        backgroundColor={getColor({color: 'background.400'})}
        isVisible={isVisible}
        onClose={onClose}>
        <View
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
            paddingHorizontal: 24,
            paddingVertical: 10,
          }}>
          <FlatList
            data={
              data?.length > 0
                ? [{title: 'Gallery'}, ...data]
                : [{title: 'Gallery'}]
            }
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            ItemSeparatorComponent={<Divider my="10px" />}
          />
        </View>
      </CustomActionSheet>
    );
  },
);

export default AlbumsSheet;
