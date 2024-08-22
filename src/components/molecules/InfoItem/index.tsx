import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
} from '~/components/elemental';
import {ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';

const InfoItem = ({
  title,
  imageUrl,
  isAdded,
  onAddPress,
  onRemovePress,
  isLoading,
}: {
  title: string;
  imageUrl?: string;
  onAddPress?: () => void;
  onRemovePress?: () => void;
  isAdded: boolean;
  isLoading?: boolean;
}) => {
  return (
    <HStack alignItems="center" space="8px">
      <Image style={styles.image} resizeMode="cover" src={imageUrl} />
      <Typography
        color="gray.800"
        fontSize="md"
        flexShrink="1"
        fontWeight="600"
        numberOfLines={1}>
        {title}
      </Typography>
      <VStack flex="1" />
      <TouchableOpacity
        style={[
          styles.addCircle,
          isAdded && {
            backgroundColor: getColor({color: 'primary.500'}),
          },
        ]}
        onPress={isAdded ? onRemovePress : onAddPress}>
        {isLoading ? (
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

export default memo(InfoItem);

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
