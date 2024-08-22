import React from 'react';
import {StyleSheet} from 'react-native';
import FullScreenSwipe from './FullScreenSwipe';
import SimpleSwipe from './SimpleSwipe';


const SwipeList = ({
  variant,
  data
}: {
  variant: 'medium' | 'fullscreen';
  data:any
}) => {

  switch (variant) {
    case 'medium':
      return <SimpleSwipe data={data}/>
    case 'fullscreen':
      return <FullScreenSwipe data={data}/>;
    default:
      return <SimpleSwipe data={data}/>;
  }
};

export default SwipeList;

const styles = StyleSheet.create({});
