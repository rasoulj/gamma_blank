import React, {Fragment, memo, useEffect, useState} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import Lesson1Icon from '~/assets/icons/CustomIcons/Lesson1.icon';
import Lesson2Icon from '~/assets/icons/CustomIcons/Lesson2.icon';
import {Typography, VStack} from '~/components/elemental';
import EducationLessonItem from '~/components/molecules/EducationLessonItem';

import styles from './styles';
import Lesson3Icon from '~/assets/icons/CustomIcons/Lesson3Icon';
import Lesson4Icon from '~/assets/icons/CustomIcons/Lesson4Icon';
import {toPascalCase} from '~/utils/helper';
import useAuthStore from '~/stores/authStore';

const CourseLessons = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const user = useAuthStore(state => state?.user);

  const chooseIcon = index => {
    switch (index) {
      case 0:
        return <Lesson1Icon />;
      case 1:
        return <Lesson2Icon />;
      case 2:
        return <Lesson3Icon />;
      case 3:
        return <Lesson4Icon />;
      default:
        return <Lesson1Icon />;
    }
  };

  let array = [];

  const opendTopics = () => {
    switch (data?.course?.paymentTopicConfiguration) {
      case 'NO_FREE_TOPICS':
        return (array = []);
      case 'FIRST_TOPIC_IS_FREE':
        return (array = [0]);
      case 'FIRST2_TOPICS_ARE_FREE':
        return (array = [0, 1]);
      case 'FIRST3_TOPICS_ARE_FREE':
        return (array = [0, 1, 2]);
      case 'FIRST4_TOPICS_ARE_FREE':
        return (array = [0, 1, 2, 3]);
    }
  };

  useEffect(() => {
    opendTopics();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <Fragment key={index}>
        <Typography
          fontSize="md"
          fontWeight={'500'}
          lineHeight={22}
          mt="5"
          color={'gray.500'}>
          {toPascalCase(item?.title)}
        </Typography>
        {item?.topics?.map((value, innerIndex) =>
          !value?.isDraft ? (
            <EducationLessonItem
              key={innerIndex}
              course={value}
              style={styles.margin}
              courseId={data?.course?.id}
              unlockNextItem={() => {
                setCurrentIndex(currentIndex + 1);
              }}
              currentReadable={
                currentIndex == innerIndex &&
                (data?.isEnrolled ?? user?.userRole === 'educator')
              }
              isOpen={
                (currentIndex == innerIndex &&
                  index == 0 &&
                  data?.isEnrolled) ||
                (index === 0 && array.includes(innerIndex)) ||
                user?.userRole === 'educator'
              }
            />
          ) : (
            <></>
          ),
        )}
        <VStack alignItems={'center'} mt="7">
          {chooseIcon(index)}
        </VStack>
      </Fragment>
    );
  };

  return (
    <Tabs.FlatList
      data={data?.course?.lessons}
      contentContainerStyle={styles.TabStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};
export default memo(CourseLessons);
