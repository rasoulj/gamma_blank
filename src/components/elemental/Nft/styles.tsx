import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
  },
  ScrollContainer: {
    flex: 1,
  },
  Container: {
    padding: 20,
  },
  Image: {
    shadowColor: '#0000001a',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 10,
    height: 400,
  },
  Title: {
    color: '#121212',
    fontSize: 24,
    marginVertical: 15,
  },
  PriceWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  Price: {
    borderColor: '#b3ddd2',
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 12,
    color: '#000000',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  PropertyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  PropertyItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  PropertyItem: {
    color: '#121212',
    fontSize: 12,
    marginBottom: 10,
  },
  PropertyItemValue: {
    color: '#121212',
    fontSize: 12,
    fontWeight: '300',
  },
  Label: {
    color: '#121212',
    fontSize: 24,
    fontWeight: '300',
  },
  HeaderLabel: {
    color: '#121212',
    fontSize: 17,
    marginLeft: 10,
  },
  Description: {
    color: '#121212',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 22,
    marginVertical: 15,
  },
  AccordionHeaderWrapperMain: {
    display: 'flex',
    flexDirection: 'column',
  },
  AccordionHeaderWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  HeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderWrapperWithMargin: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  AddCommentWrapper: {    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:5
  },
});

export default styles;
