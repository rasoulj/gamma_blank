import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f1f1f',
  },
  Price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1de9b6',
  },
  Description: {
    fontSize: 14,
    color: '#333333',
  },
  Label: {
    fontSize: 17,
    color: '#000',
    marginTop: 32,
    marginBottom: 16,
  },  
  Includes: {
    display: 'flex',
    flexDirection: 'column',    
  },
  CheckboxWrapper: {
    backgroundColor: '#83f500',
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    padding: 2,
  },
  IncludeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3
  },
  IncludeLabel: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 6,
  },
  Button: {
    position: 'relative',
    borderColor: '#1DE9B6',
    borderRadius: 20,
    color: '#1DE9B6',
  },
});

export default styles;
