import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {moderateScale} from 'react-native-size-matters';

function BubbleMessage(props) {
  const {style = {}} = props;
  return (
    <View
      style={[styles.message, props.fromMe ? styles.mine : styles.not_mine]}>
      <View
        style={[
          styles.cloud,
          {
            backgroundColor: props.fromMe ? '#1DE9B6' : '#F3F8FA',
          },
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: props.fromMe ? 'white' : 'black',
            },
          ]}>
          {props.children}
        </Text>
        <View
          style={[
            styles.arrow_container,
            props.fromMe
              ? styles.arrow_right_container
              : styles.arrow_left_container,
          ]}>
          <Svg
            style={props.fromMe ? styles.arrow_right : styles.arrow_left}
            width={moderateScale(15.5, 0.6)}
            height={moderateScale(17.5, 0.6)}
            viewBox="32.484 17.5 15.515 17.5"
            enable-background="new 32.484 17.5 15.515 17.5">
            <Path
              d={
                props.fromMe
                  ? 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
                  : ' M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
              }
              fill={props.fromMe ? '#1DE9B6' : '#F3F8FA'}
              x="0"
              y="0"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

export default BubbleMessage;

const styles = StyleSheet.create({
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5),
  },
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  arrow_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(7, 2),
  },
  mine: {
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  not_mine: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  cloud: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  text: {
    paddingTop: 3,
    fontSize: 17,
    lineHeight: 22,
  },
});
