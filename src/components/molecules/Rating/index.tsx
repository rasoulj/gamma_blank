import {HStack} from 'native-base';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Typography from '../../atoms/Typography';

function Rating(props, {totalScore = 5}) {
  const [defaultRating, setDefaultRating] = React.useState(
    props?.children || 0,
  );
  const {
    rating,
    onChange,
    type,
    onlyRead,
  }: {
    rating: number;
    onChange: (item) => void;
    type: 'simple' | 'numberic';
    onlyRead?: boolean;
  } = props;
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);

  // React.useEffect(() => {
  //   onChange(props?.children);
  // }, [props?.children]);

  const RatingBar = () => {
    return (
      <HStack style={styles.ratingBar} alignSelf={'center'}>
        {rating !== undefined
          ? maxRating?.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item}
                  disabled={onlyRead}
                  onPress={() => onChange(item)}>
                  <Image
                    style={[styles.starImgStyle, props?.starStyle]}
                    source={
                      item <= rating
                        ? require('src/assets/images/star_filled.png')
                        : require('src/assets/images/star_corner.png')
                    }
                  />
                </TouchableOpacity>
              );
            })
          : maxRating?.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item}
                  onPress={() => [setDefaultRating(item), onChange(item)]}>
                  <Image
                    style={[styles.starImgStyle, props?.starStyle]}
                    source={
                      item <= defaultRating
                        ? require('src/assets/images/star_filled.png')
                        : require('src/assets/images/star_corner.png')
                    }
                  />
                </TouchableOpacity>
              );
            })}
      </HStack>
    );
  };

  return (
    <View style={[styles.container, props?.style]}>
      {type === 'numberic' ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={[styles.starImgStyle, props?.starStyle]}
            source={require('src/assets/images/star_filled.png')}
          />
          <Typography
            style={{
              fontSize: 14,
              fontWeight: '500',
              marginHorizontal: 4,
              marginTop: 2,
            }}>
            {Math.round(rating * 10) / 10}
          </Typography>
        </View>
      ) : (
        <RatingBar />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  ratingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImgStyle: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
  },
});
export default Rating;
