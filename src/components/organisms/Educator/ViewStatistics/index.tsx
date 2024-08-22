import {StyleSheet} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {
  HStack,
  LoadIndicator,
  ScrollView,
  Typography,
  VStack,
  View,
  deviceWidth,
  getColor,
  useRoute,
} from '~/components';
import {LineChart, PieChart} from 'react-native-chart-kit';
import Svg, {Polygon} from 'react-native-svg';
import {useGetStatistics} from '../../CourseList/hook';
import StarGoldIcon from '~/assets/icons/CustomIcons/StarYellow.icon';
import CenterIconContainer from '~/components/atoms/CenterIconContainer';
import dayjs from 'dayjs';
import CalendarComponent from './Calendar';
import {useGetSearchHistory} from '~/components/molecules/ItemSearch/hook';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const ViewStatistics = () => {
  const {params} = useRoute();

  const [selectedYear, setSelectedYear] = useState(
    Number(dayjs().format('YYYY')),
  );

  const [selectedData, setSelectedData] = useState(null);
  const [yearData, setYearData] = useState([]);

  const {data, isLoading}: any = useGetStatistics({
    courseId: params?.courseId,
  });

  const courseData = data?.course_getStatistics?.result;

  const {data: searchData, isLoading: searchLoading} = useGetSearchHistory({
    where: {and: [{type: {eq: 'Course'}}, {value: {eq: courseData?.title}}]},
    enabled: !!courseData,
  });

  const progressData = [
    {
      name: 'enrollCount',
      population: courseData?.enrollCount,
      color: '#1E88E5',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: courseData?.commentCount,
      color: '#8E24AA',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: courseData?.questionCount,
      color: '#D81B60',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: searchData?.totalCount,
      color: '#43A047',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  useEffect(() => {
    setYearData(courseData?.enrolls.find(item => item.year === selectedYear));
  }, [selectedYear, data]);

  const chartConfig = {
    backgroundGradientFrom: getColor({color: 'background.500'}),
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: getColor({color: 'background.500'}),
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const allZero = progressData.every(item => item.population === 0);

  const countArray = months?.map(month => {
    const item = yearData?.months?.find(d => d?.month === month);
    return item ? item?.count : 0;
  });

  const data2 = {
    labels: months,
    datasets: [
      {
        data: countArray,
      },
    ],
  };

  const handleDataPointClick = data => {
    setSelectedData(data);
  };

  return isLoading || searchLoading ? (
    <LoadIndicator />
  ) : (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Typography fontWeight={'400'} fontSize="sm" mb={'2'}>
        Course Title
      </Typography>
      <HStack justifyContent={'space-between'}>
        <Typography fontWeight={'700'} fontSize="md">
          {courseData?.title}
        </Typography>
        <HStack alignItems={'center'}>
          <StarGoldIcon width={15} height={15} />
          <Typography
            fontWeight={'500'}
            fontSize="sm"
            lineHeight={19}
            color="gray.800"
            ml="2">
            {Number.isInteger(courseData?.rateAverage)
              ? courseData?.rateAverage
              : courseData?.rateAverage?.toFixed(1)}
          </Typography>
        </HStack>
      </HStack>
      {allZero ? (
        <VStack alignItems={'center'} my="4">
          <CenterIconContainer
            width={160}
            height={160}
            color={getColor({color: 'gray.300'})}>
            <VStack
              width={140}
              height={140}
              borderRadius={'full'}
              bg={getColor({color: 'background.500'})}
            />
          </CenterIconContainer>
        </VStack>
      ) : (
        <VStack alignItems={'center'} my="4">
          <PieChart
            data={progressData}
            width={178}
            height={178}
            backgroundColor={'transparent'}
            paddingLeft={'43'}
            accessor={'population'}
            chartConfig={chartConfig}
            hasLegend={false}
          />

          <VStack style={styles.circle} />
        </VStack>
      )}
      <HStack justifyContent={'space-between'} py="1.5">
        <HStack alignItems={'center'} space={'2'}>
          <CenterIconContainer width={'3'} height={'3'} color={'#43A047'} />
          <Typography fontSize="sm" fontWeight={'500'}>
            Number of Search
          </Typography>
        </HStack>
        <Typography fontSize="xs" fontWeight={'500'}>
          {searchData?.totalCount}
        </Typography>
      </HStack>
      <HStack justifyContent={'space-between'} py="1.5">
        <HStack alignItems={'center'} space={'2'}>
          <CenterIconContainer width={'3'} height={'3'} color={'#1E88E5'} />
          <Typography fontSize="sm" fontWeight={'500'}>
            Number of Enroll
          </Typography>
        </HStack>
        <Typography fontSize="xs" fontWeight={'500'}>
          {courseData?.enrollCount}
        </Typography>
      </HStack>
      <HStack justifyContent={'space-between'} py="1.5">
        <HStack alignItems={'center'} space={'2'}>
          <CenterIconContainer width={'3'} height={'3'} color={'#8E24AA'} />
          <Typography fontSize="sm" fontWeight={'500'}>
            Number of Comments
          </Typography>
        </HStack>
        <Typography fontSize="xs" fontWeight={'500'}>
          {courseData?.commentCount}
        </Typography>
      </HStack>
      <HStack justifyContent={'space-between'} py="1.5">
        <HStack alignItems={'center'} space={'2'}>
          <CenterIconContainer width={'3'} height={'3'} color={'#D81B60'} />
          <Typography fontSize="sm" fontWeight={'500'}>
            Number of Questions
          </Typography>
        </HStack>
        <Typography fontSize="xs" fontWeight={'500'}>
          {courseData?.questionCount}
        </Typography>
      </HStack>
      <Typography fontWeight={'700'} fontSize="md" mt="8">
        Enrollment
      </Typography>
      <CalendarComponent
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />
      <VStack>
        <LineChart
          data={{
            labels: data2?.labels,
            datasets: data2?.datasets,
          }}
          onDataPointClick={handleDataPointClick}
          width={deviceWidth - 40}
          height={220}
          withShadow={false}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: () => getColor({color: 'secondary.500'}),
            labelColor: () => getColor({color: 'gray.500'}),
            decimalPlaces: 0,
            strokeWidth: 2,
            propsForHorizontalLabels: styles.ylabel,
            propsForVerticalLabels: styles.xlabel,
          }}
          withVerticalLines={false}
          withDots={true}
          bezier
          style={styles.calendarStyle}
        />
        {selectedData && (
          <Fragment>
            <VStack
              style={styles.modalContent}
              shadow={'4'}
              top={selectedData?.y - 80}
              left={selectedData?.x - 45}>
              <Typography fontWeight={'700'} fontSize="xs">
                {months[selectedData?.index]}
              </Typography>
              <HStack alignItems={'center'} space={'2'}>
                <Typography fontWeight={'400'} fontSize="xs">
                  {countArray[selectedData?.index]} View
                </Typography>
                <CenterIconContainer
                  width={'2'}
                  height={'2'}
                  color={getColor({color: 'secondary.500'})}
                />
              </HStack>
              <Triangle />
            </VStack>
          </Fragment>
        )}
      </VStack>
    </ScrollView>
  );
};

export default ViewStatistics;

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 100,
    top: '16.5%',
    right: '33.2%',
  },

  container: {flexGrow: 1, paddingBottom: 100},

  xlabel: {
    fontSize: 10,
    fontWeight: '400',
    marginHorizontal: 5,
  },

  ylabel: {fontSize: 12, fontWeight: '400'},

  modalContent: {
    width: 90,
    height: 71,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: getColor({color: 'gray.100'}),
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
  },

  calendarStyle: {
    marginVertical: 8,
    paddingRight: 30,
  },

  triangleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    top: '100%',
  },
});

export const Triangle = () => {
  return (
    <View style={styles.triangleContainer}>
      <Svg width="10" height="10">
        <Polygon points="5,0 10,10 0,10" fill={getColor({color: 'gray.100'})} />
      </Svg>
    </View>
  );
};
