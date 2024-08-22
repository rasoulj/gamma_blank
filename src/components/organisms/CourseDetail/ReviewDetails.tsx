import React, {Fragment, memo, useState} from 'react';
import {LayoutAnimation, StyleSheet} from 'react-native';
import {
  ArrowDownIconSet,
  ArrowUpIconSet,
  HStack,
  Layer,
  Rating,
  Typography,
  VStack,
  View,
  getColor,
} from '~/components/elemental';

import Progress from '~/components/atoms/Progress';
import {TouchableOpacity} from 'react-native';

const ReviewDetails = ({data}) => {
  const [showReviewDetail, setShowReviewDetail] = useState(false);

  return (
    <Layer style={styles.container}>
      <HStack alignItems={'center'} justifyContent={'space-between'} mx={1}>
        <TouchableOpacity
          onPress={() => [
            setShowReviewDetail(!showReviewDetail),
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            ),
          ]}
          style={styles.btn}>
          {showReviewDetail ? (
            <ArrowUpIconSet style={styles.arrow} />
          ) : (
            <ArrowDownIconSet style={styles.arrow} />
          )}
          <Typography style={styles.title}>Rate & Reviews</Typography>
        </TouchableOpacity>
      </HStack>

      {showReviewDetail && (
        <Fragment>
          <View style={[styles.btn, styles.margin]}>
            <Rating
              type="numberic"
              rating={data?.rateAverage}
              onlyRead
              style={styles.rating}
            />
            <Typography style={styles.starCount}>
              {' '}
              (
              {data?.reviewCount === 1
                ? `${1} Review`
                : `${data?.reviewCount} Reviews`}
              )
            </Typography>
          </View>
          <View style={styles.mapContainer}>
            {[5, 4, 3, 2, 1].map(item => {
              const ratePercent = {
                1: data?.ratePercent_1,
                2: data?.ratePercent_2,
                3: data?.ratePercent_3,
                4: data?.ratePercent_4,
                5: data?.ratePercent_5,
              };
              return (
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  space="1">
                  <Rating type="numberic" rating={item} onlyRead />
                  <VStack mx="2" flex={1}>
                    <Progress
                      progress={ratePercent[item]}
                      containerStyle={styles.percentText}
                      style={styles.progressStyle}
                      textStyle={styles.ml}
                    />
                  </VStack>
                </HStack>
              );
            })}
          </View>
        </Fragment>
      )}
    </Layer>
  );
};
export default memo(ReviewDetails);

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.15,
    shadowRadius: 9,
    padding: 16,
    borderRadius: 15,
    margin: 5,
    marginTop: 24,
    marginBottom: 8,
    elevation: 5,
    width: '100%',
    alignSelf: 'center',
  },

  mapContainer: {marginVertical: 12, marginTop: 8, paddingHorizontal: 8},

  arrow: {marginRight: 10},

  title: {fontSize: 18, fontWeight: '700'},

  btn: {flexDirection: 'row', alignItems: 'center'},

  starCount: {fontSize: 14, fontWeight: '400'},

  percentText: {
    marginRight: 10,
  },

  progressStyle: {marginHorizontal: 0},

  rating: {alignSelf: 'flex-start'},

  margin: {paddingHorizontal: 8, marginTop: 16},

  ml: {marginLeft: 0},
});
