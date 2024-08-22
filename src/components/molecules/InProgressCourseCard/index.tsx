import React from 'react';
import {Image, Typography, VStack, getColor} from '~/components/elemental';
import {HStack, Pressable} from 'native-base';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import {StyleSheet, ViewStyle} from 'react-native';
import Progress from '~/components/atoms/Progress';

const InProgressCourseCard = ({
  item,
  onCoursePress,
  style,
}: {
  item: any;
  onCoursePress: () => void;
  style?: ViewStyle;
}) => {
  const getPersentColor = percent => {
    if (percent < 30) {
      return getColor({color: 'error.500'});
    } else if (percent < 90 && percent >= 30) {
      return getColor({color: 'rate.100'});
    } else {
      return getColor({color: 'success.500'});
    }
  };

  return (
    <Pressable
      shadow={'2'}
      style={[styles.container, style]}
      onPress={() => onCoursePress?.()}>
      {item?.course?.photoUrl ? (
        <Image style={styles.img} source={{uri: item?.course?.photoUrl}} />
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
        <HStack justifyContent={'center'}>
          <Typography
            color={getColor({color: 'gray.800'})}
            style={styles.title}
            numberOfLines={2}>
            {item?.course?.title}
          </Typography>
        </HStack>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'xs'}
          fontWeight={'500'}
          lineHeight={17}>
          {item?.course?.user?.fullName}
        </Typography>
        <Typography
          color={getColor({color: 'gray.500'})}
          fontSize={'xs'}
          lineHeight={17}
          fontWeight={'500'}>
          {item?.course?.category}
        </Typography>
        <VStack mt="14px">
          <Progress
            progress={item?.progress}
            title="Progress:"
            parentColor={getColor({color: 'gray.300'})}
            presentColor={getPersentColor(item?.progress)}
            style={styles.progressContainer}
            textStyle={styles.progressText}
          />
        </VStack>
      </VStack>
    </Pressable>
  );
};

export default InProgressCourseCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginVertical: 12,
    marginHorizontal: 2,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    color: getColor({color: 'gray.800'}),
    marginBottom: 4,
    flex: 1,
  },
  heartButton: {
    right: '4%',
    top: '2%',
    width: 30,
    height: 30,
    backgroundColor: getColor({color: 'primary.100'}),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 92,
    height: 92,
    borderRadius: 5,
  },
  progressText: {marginLeft: 0},
  progressContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 0,
  },
});
