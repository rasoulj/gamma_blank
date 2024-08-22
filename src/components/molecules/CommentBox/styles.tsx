import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    marginBottom:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',        
  },
  AvatarWrapper: {
    backgroundColor:'#ccc',
    borderRadius: 100,
    overflow: 'hidden',
    height: 24,
    width: 24,
    marginRight:5
  },
  Avatar: {
    height: 24,
    width: 24,
  },
  ContentWrapper: {
    display: 'flex',
    flexDirection: 'column',        
    width: '80%'
  },
  CommentWrapper: {
    backgroundColor: '#f3f8fa',
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    borderRadius: 8,
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Name: {
    fontSize: 14,
    color: '#000000',    
    marginRight: 5
  },
  Username: {
    fontSize: 12,
    color: '#006194',    
  },
  Content: {
    marginVertical: 5,
    fontWeight: '300',
    fontSize: 14,
    color: '#333333',
  },
  Date: {
    fontSize: 12,
    color: '#828282',
    alignSelf: 'flex-end',
  },
  LikeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Like: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
  },
});

export default styles;
