import {StyleSheet} from 'react-native';
import React from 'react';
import {Layer, Typography} from '~/components/elemental';

const QuestionContainer = ({page, counter = 5, setPage}) => {
  const numbers = Array.from(Array(counter).keys(), num => num + 1);

  const getVisibleNumbers = () => {
    const startIndex = Math.max(0, page - 4);
    const endIndex = Math.min(numbers.length - 1, page + 2);

    return numbers.slice(startIndex, endIndex + 1);
  };

  const visibleNumbers = getVisibleNumbers();

  return (
    <Layer style={styles.layer}>
      {visibleNumbers?.length < counter && !visibleNumbers.includes(1) && (
        <Typography style={styles.title} color="gray.300">
          ...
        </Typography>
      )}
      {visibleNumbers.map(item => (
        <Typography
          color={page === item ? 'gray.800' : 'gray.300'}
          style={styles.title}
          key={item}
          onPress={() => setPage(item)}>
          {item}
        </Typography>
      ))}
      {visibleNumbers?.length < counter &&
        !visibleNumbers.includes(counter) && (
          <Typography style={styles.title} color="gray.300">
            ...
          </Typography>
        )}
    </Layer>
  );
};

export default QuestionContainer;

const styles = StyleSheet.create({
  title: {fontSize: 16, fontWeight: '500', marginHorizontal: 10},

  layer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
