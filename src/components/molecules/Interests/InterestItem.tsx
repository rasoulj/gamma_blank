import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceWidth} from '~/utils/methods';
import {Typography, getColor, useNavigate} from '~/components/elemental';
import useIterestStore from '~/stores/interestStore';

const InterestItem = ({item, multiSelect = true}) => {
  const {selectedCategorys, setSelectedCategorys} = useIterestStore();

  const {navigateWithName} = useNavigate();

  const onItemPress = () => {
    if (!multiSelect) {
      navigateWithName('CourseList', {data: item, hasHeader: true});
    } else {
      selectedCategorys.includes(item?.name ?? item)
        ? setSelectedCategorys(
            selectedCategorys.filter(i => i !== item ?? i?.name !== item?.name),
          )
        : setSelectedCategorys([...selectedCategorys, item?.name ?? item]);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          borderColor: getColor({
            color:
              multiSelect && selectedCategorys.includes(item?.name ?? item)
                ? 'primary.500'
                : 'background.500',
          }),
        },
      ]}
      onPress={() => onItemPress()}>
      <Typography numberOfLines={2} style={styles.title}>
        {item?.name ?? item}
      </Typography>
    </TouchableOpacity>
  );
};

export default InterestItem;

const styles = StyleSheet.create({
  btn: {
    width: (deviceWidth - 64) / 3,
    height: 85,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.2,
    backgroundColor: getColor({color: 'background.500'}),
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    elevation:5
  },

  title: {fontSize: 12, fontWeight: '500', margin: 14},
});
