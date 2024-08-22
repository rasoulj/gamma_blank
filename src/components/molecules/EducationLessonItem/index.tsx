import React, {Fragment, useEffect, useState} from 'react';
import styles from './styles';
import {
  BookIconSet,
  TickIconSet,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import {Pressable} from 'native-base';
import {ProductHorizontalItemProps} from '../EducationHorizontalItem/product-horizontal-item.props';

import LockSolidIconSet from '~/assets/icons/CustomIcons/LockSolid.icon';
import CenterIconContainer from '~/components/atoms/CenterIconContainer';
import {convertDurationToTime, toPascalCase} from '~/utils/helper';
import LessonDetailModal from '~/components/organisms/CourseDetail/Modals/LessonDetailModal';
import {useGeTopics} from '~/components/organisms/CourseList/hook';

const EducationLessonItem = ({
  course,
  style,
  isOpen,
  courseId,
  currentReadable,
  unlockNextItem,
}: ProductHorizontalItemProps & {
  isOpen?: boolean;
  unlockNextItem?: () => void;
  currentReadable: boolean;
}) => {
  const [showLessonModal, setShowLessonModal] = useState(false);

  const {data} = useGeTopics({
    lessonId: course?.lessonId,
    where: {topic: {id: {eq: course?.id}}},
  });

  useEffect(() => {
    if (data?.pages[0]?.isRead) {
      unlockNextItem?.();
    }
  }, [data]);

  return (
    <Fragment>
      <Pressable
        shadow={'4'}
        style={[styles.container, style]}
        onPress={() =>
          isOpen || data?.pages[0]?.isRead ? setShowLessonModal(true) : {}
        }>
        <CenterIconContainer
          width={'10'}
          height={'10'}
          color={getColor({
            color:
              isOpen || data?.pages[0]?.isRead ? 'secondary.500' : 'gray.300',
          })}>
          <BookIconSet
            solid
            color={getColor({
              color:
                isOpen || data?.pages[0]?.isRead ? 'secondary.500' : 'gray.300',
            })}
            width={18}
            height={18}
          />
        </CenterIconContainer>

        <VStack flex={1} ml="2">
          <Typography style={styles.title} numberOfLines={2}>
            {toPascalCase(course?.topic)}
          </Typography>

          <Typography
            color={getColor({color: 'gray.500'})}
            style={styles.text}
            fontWeight={'500'}
            lineHeight={17}>
            {convertDurationToTime(course?.duration)}
          </Typography>
        </VStack>
        {currentReadable ? (
          <CenterIconContainer
            width={'6'}
            height={'6'}
            color={getColor({color: 'primary.500'})}>
            <VStack
              w="5"
              h="5"
              borderRadius={'full'}
              bg={getColor({color: 'background.500'})}
            />
          </CenterIconContainer>
        ) : isOpen || data?.pages[0]?.isRead ? (
          <CenterIconContainer
            width={'6'}
            height={'6'}
            color={getColor({color: 'primary.500'})}>
            <TickIconSet
              width={15}
              height={15}
              color={getColor({color: 'gray.50'})}
            />
          </CenterIconContainer>
        ) : (
          <LockSolidIconSet />
        )}
      </Pressable>
      <LessonDetailModal
        item={course}
        isVisible={showLessonModal}
        courseId={courseId}
        onClose={() => setShowLessonModal(false)}
      />
    </Fragment>
  );
};

export default EducationLessonItem;
