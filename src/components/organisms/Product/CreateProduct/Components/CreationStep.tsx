import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Layer, Typography, getColor} from '~/components/elemental';

const CreationStep = ({page, setPage, counter = 5}) => {
  return (
    <Layer style={styles.layer}>
      {Array.from(Array(counter).keys(), num => num + 1).map(item => {
        return (
          <>
            <TouchableOpacity
              style={[
                styles.stepsContainer,
                {
                  borderWidth: page >= item ? 0 : 1,

                  backgroundColor:
                    page >= item
                      ? item === page
                        ? getColor({color: 'secondary.100'})
                        : getColor({color: 'secondary.500'})
                      : getColor({color: 'gray.50'}),
                },
              ]} onPress={() => setPage(item)}>
              <Typography
                color={page === item ? 'secondary.500' : 'gray.300'}
                style={styles.title}>
                {item}
              </Typography>
            </TouchableOpacity>
            {item !== counter && (
              <Layer
                style={{
                  width: 25,
                  height: 1,
                  backgroundColor: getColor({
                    color: page > item ? 'secondary.500' : 'gray.300',
                  }),
                }}
              />
            )}
          </>
        );
      })}
    </Layer>
  );
};

export default CreationStep;

const styles = StyleSheet.create({
  title: {fontSize: 14, fontWeight: '500'},
  stepsContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderColor: getColor({color: 'gray.300'}),
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
});
