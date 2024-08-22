import React from 'react';
import {
  BookIconSet,
  TickIconSet,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import {Pressable} from 'native-base';
import {ProductHorizontalItemProps} from '../EducationHorizontalItem/product-horizontal-item.props';

import CenterIconContainer from '~/components/atoms/CenterIconContainer';
import {StyleSheet} from 'react-native';
import {toPascalCase} from '~/utils/helper';

const BookmarkCourseCard = ({
  course,
  onCoursePress,
  style,
}: ProductHorizontalItemProps) => {
  return (
    <Pressable
      shadow={'4'}
      style={[styles.container, style]}
      onPress={() => onCoursePress?.()}>
      <CenterIconContainer
        width={'40px'}
        height={'40px'}
        color={getColor({color: 'secondary.500'})}>
        <BookIconSet
          solid
          color={getColor({color: 'secondary.500'})}
          width={18}
          height={18}
        />
      </CenterIconContainer>

      <VStack flex={1} ml="2">
        <Typography style={styles.title} numberOfLines={2}>
          {toPascalCase(course?.topic?.topic ?? '')}
        </Typography>

        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize="xs"
          fontWeight={'500'}
          lineHeight={17}>
          {toPascalCase(course?.topic?.lesson?.title)}
        </Typography>
      </VStack>

      <CenterIconContainer
        width={'24px'}
        height={'24px'}
        color={getColor({color: 'primary.500'})}>
        <TickIconSet
          width={15}
          height={15}
          color={getColor({color: 'gray.50'})}
        />
      </CenterIconContainer>
    </Pressable>
  );
};

export default BookmarkCourseCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    color: getColor({color: 'gray.800'}),
    flex: 1,
  },
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginHorizontal: 2,
    marginVertical: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
