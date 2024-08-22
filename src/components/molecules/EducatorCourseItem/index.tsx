import React, {Fragment, useState} from 'react';
import {
  Image,
  MoreIconSet,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import {HStack, Pressable} from 'native-base';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import {StyleSheet} from 'react-native';
import EducatorCourseItemModal from './EducatorCourseItemModal';
import ConfirmationModal from './ConfirmationModal';
import {useDeleteCourse} from '~/components/organisms/CourseList/hook';
import {useQueryClient} from 'react-query';
import {toPascalCase} from '~/utils/helper';
import dayjs from 'dayjs';

const EducatorCourseItem = ({course}) => {
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const queryClient = useQueryClient();

  const {mutate, isLoading} = useDeleteCourse();

  const onDeleteCourse = () => {
    mutate(
      {entityId: course?.course?.id},
      {
        onSuccess(data) {
          setDeleteVisible(false);
          if (data?.course_deleteCourse?.value === 'Success') {
            queryClient?.invalidateQueries('getCourses');
          }
        },
      },
    );
  };

  return (
    <Fragment>
      <Pressable shadow={'2'} style={styles.container}>
        {course?.course?.photoUrl ? (
          <Image
            style={styles.img}
            source={{uri: course?.course?.photoUrl}}
            resizeMode="cover"
          />
        ) : (
          <VStack
            alignSelf={'center'}
            width={92}
            height={92}
            p="2"
            borderRadius={5}
            borderWidth={1}
            borderColor={getColor({color: 'background.700'})}>
            <CourseItemIcon />
          </VStack>
        )}

        <VStack flex={1} ml="2">
          <HStack justifyContent={'space-between'}>
            <Typography
              color={getColor({color: 'gray.800'})}
              style={styles.title}
              numberOfLines={1}>
              {toPascalCase(course?.course?.title)}
            </Typography>
            <VStack style={styles.more}>
              <MoreIconSet onPress={() => setVisible(true)} />
            </VStack>
          </HStack>
          <Typography
            color={getColor({color: 'gray.500'})}
            fontSize={'xs'}
            lineHeight={17}
            fontWeight={'500'}>
            Creation Date:{' '}
            {dayjs(course?.course?.createdDate).format('DD/MM/YYYY')}
          </Typography>
          <Typography
            color={getColor({color: 'gray.500'})}
            fontSize={'xs'}
            lineHeight={17}
            fontWeight={'500'}>
            {course?.course?.category}
          </Typography>
          <VStack
            bg={course?.course?.isDraft ? '#0086DF' : '#39DA2C'}
            width={course?.course?.isDraft ? '45%' : '35%'}
            alignItems={'center'}
            borderRadius={10}
            px="1"
            py="1"
            mt="1">
            <Typography
              color={getColor({color: 'gray.50'})}
              fontSize={'xs'}
              fontWeight={'500'}>
              {course?.course?.isDraft ? 'Saved as Draft' : 'Published'}
            </Typography>
          </VStack>
        </VStack>
      </Pressable>
      <EducatorCourseItemModal
        item={course?.course}
        onClose={() => setVisible(false)}
        isVisible={visible}
        onDelete={() => setDeleteVisible(true)}
      />
      <ConfirmationModal
        title="Are you sure you want to delete this course?"
        rejectTitle="Cancel"
        acceptTitle="Delete"
        onClose={() => setDeleteVisible(false)}
        isVisible={deleteVisible}
        onSubmit={onDeleteCourse}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default EducatorCourseItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    color: getColor({color: 'gray.800'}),
    flex: 1,
  },
  img: {
    width: 92,
    height: 92,
    borderRadius: 5,
  },
  more: {
    transform: [{rotate: '90deg'}],
  },
});
