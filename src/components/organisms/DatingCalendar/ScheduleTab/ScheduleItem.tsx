import React, {useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  TrashIconSet,
  Typography,
  VStack,
  HStack,
  PencilIcon,
  EditIconSet,
  Divider,
} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';
import {getDateDiffTitle, getDateMonth} from '../helper';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import SelectDateTimeActionSheet from './SelectDateTimeActionSheet';

const ScheduleItem = ({
  item,
  index,
  selectable,
  onItemPress,
  selectedItem,
  hasItemMenu = false,
}: {
  item: any;
  index: number;
  selectable?: boolean;
  onItemPress?: (index, item, timeIndex) => void;
  selectedItem?: any;
  hasItemMenu?: boolean;
}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const timeIndexRef = useRef(-1);

  const times = useMemo(() => {
    let currentTimes = item?.times ? item?.times?.split(',') : [];
    return currentTimes?.map(time => {
      let timeSlots = time?.split(':');
      return `${
        parseInt(timeSlots?.[0]) === 12 ? '12' : parseInt(timeSlots?.[0]) % 12
      }:${timeSlots[1]} ${parseInt(timeSlots?.[0]) > 11 ? 'PM' : 'AM'}`;
    });
  }, [item]);

  const onPressTime = timeIndex => {
    timeIndexRef.current = timeIndex;
    if (onItemPress) onItemPress?.(index, item, timeIndex);
    else if (hasItemMenu) setVisibleMenu(true);
  };

  const onCloseMenu = () => setVisibleMenu(false);

  const onEditPress = () => {
    onCloseMenu();
    setVisibleEdit(true);
  };

  const onDeletePress = () => {
    if (timeIndexRef.current > -1 && times?.length > timeIndexRef.current) {
      let tempTimes = [...times];
      tempTimes.splice(timeIndexRef.current, 1);
    }
  };

  const onCloseEditModal = () => setVisibleEdit(false);

  return (
    <>
      <View>
        <Typography fontSize="2xl" fontWeight="600" color="gray.800">
          {getDateDiffTitle(item?.date)}
          <Typography fontSize="sm" fontWeight="500">
            {`  ${getDateMonth(item?.date)}`}
          </Typography>
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="2" my="6">
            {times?.map((item, index) => {
              return (
                <TouchableOpacity
                  disabled={!selectable && !hasItemMenu}
                  onPress={() => onPressTime(index)}>
                  <View
                    style={
                      selectedItem === index
                        ? styles.selectedTimeContainer
                        : styles.timeContainer
                    }
                    key={`${item}_${index}`}>
                    <Typography fontSize="sm" fontWeight="500" color="gray.800">
                      {item}
                    </Typography>
                  </View>
                </TouchableOpacity>
              );
            })}
          </HStack>
        </ScrollView>
      </View>
      {visibleMenu && (
        <ItemMenu
          {...{
            isVisible: visibleMenu,
            onClose: onCloseMenu,
            onEditPress,
            onDeletePress,
          }}
        />
      )}
      {visibleEdit && (
        <SelectDateTimeActionSheet
          isVisible={visibleEdit}
          onClose={onCloseEditModal}
          item={item}
        />
      )}
    </>
  );
};

export default ScheduleItem;

const ItemMenu = ({
  isVisible,
  onClose,
  onEditPress,
  onDeletePress,
}: {
  isVisible: boolean;
  onClose: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
}) => {
  return (
    <CustomActionSheet {...{isVisible, onClose}}>
      <VStack space="4" paddingBottom="6">
        <TouchableOpacity onPress={onEditPress}>
          <HStack space="2" alignItems="center">
            <EditIconSet color="gray.800" width={24} height={24} />
            <Typography color="gray.800" fontWeight="700" fontSize="sm">
              Edit Time
            </Typography>
          </HStack>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={onDeletePress}>
          <HStack space="2" alignItems="center">
            <TrashIconSet color="error.500" width={24} height={24} />
            <Typography color="error.500" fontWeight="700" fontSize="sm">
              Delete
            </Typography>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </CustomActionSheet>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderColor: getColor({color: 'gray.300'}),
    backgroundColor: getColor({color: 'gray.50'}),
  },

  selectedTimeContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderColor: getColor({color: 'primary.500'}),
    backgroundColor: getColor({color: 'primary.100'}),
  },
});
