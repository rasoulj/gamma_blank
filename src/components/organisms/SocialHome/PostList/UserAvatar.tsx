import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import {
  HStack,
  VStack,
  relativeTimeFromNow,
  scale,
} from '~/components/elemental';
import {
  User2Icon,
  Typography,
  isDark,
  TreeDotIcon,
  useNavigate,
  Image,
} from '~/components/elemental';
import PostItemModal from './Modals/PostItemModal';
import {getColor} from '~/utils/helper/theme.methods';

const imageSize = scale(41);

const PostListItem = ({
  item,
  paddingX,
  pb = '2',
}: {
  item: any;
  paddingX?: any;
  pb?: any;
}) => {
  const {navigateWithName} = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const dateText = useMemo(() => {
    return relativeTimeFromNow(item?.createdDate);
  }, [item]);
  return (
    <>
      <HStack
        pb={pb}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: paddingX,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigateWithName('profile', {userId: item?.poster?.id})
          }>
          <HStack space="2" alignItems="center">
            {item?.poster?.photoUrl ? (
              <Image src={item?.poster?.photoUrl} style={styles.avatar} />
            ) : (
              <User2Icon width={imageSize} height={imageSize} />
            )}
            <VStack>
              <Typography fontWeight="500" fontSize="sm" color="gray.800">
                {item?.poster?.fullName}
              </Typography>
              <Typography
                fontSize="xs"
                fontWeight="400"
                color={isDark() ? 'gray.500' : 'gray.500'}>
                {dateText}
              </Typography>
            </VStack>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <TreeDotIcon color={getColor({color: 'gray.800'})} />
        </TouchableOpacity>
      </HStack>
      <PostItemModal
        item={item}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default memo(PostListItem);

const styles = StyleSheet.create({
  avatar: {width: imageSize, height: imageSize, borderRadius: imageSize / 2},
});
