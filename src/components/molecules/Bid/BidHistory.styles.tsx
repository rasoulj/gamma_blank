import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  Title: {
    fontSize: 24,
    color: '#121212',
    marginBottom: 15,
  },
  EstimateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  Label: {
   fontSize: 12,
    fontWeight: '300',
    color: '#8f8f8f',
    marginVertical: 10,
  },
  Price: {
    fontSize: 14,
    color: '#000000',
  },
  Warning: {
    fontSize: 12,
    fontWeight: '300',
    color: '#121212',
  },
  BidHistoryWrapper: {
    maxHeight: 300,
    overflow: 'scroll',
  },
  BidWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,    
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,    
    maxHeight: 100,
    overflow: 'scroll',
  },
  BidUserWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  BidAvatar: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderRadius: 100,
  },
  Avatar: {
    width: '100%',
    height: '100%',    
  },
  BidUsername: {
    color: '#121212',
    fontWeight: '300',
    fontSize: 12,
    marginLeft:10
  },
  BidUsernameOwner: {
    color: '#295800',
    fontSize: 12,
    marginLeft:10
  },
  BidPrice: {
    color: '#121212',
    fontSize: 12,
  },
  StyledButton: {
    borderRadius: 100,
    marginTop: 15,
  },
  Timer: {
    alignSelf: 'flex-end',    
    fontSize: 5
  },
});

export default styles;
