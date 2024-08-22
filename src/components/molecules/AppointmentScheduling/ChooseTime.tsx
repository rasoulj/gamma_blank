import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  ArrowDownIconSet,
  Input,
  Layer,
  Typography,
} from '~/components/elemental';

const ChooseTime = ({data, time, setTime, isLoading}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Layer>
      <Typography style={{fontWeight: '600', marginVertical: 15}}>
        Choose start time
      </Typography>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={{
          position: 'absolute',
          top: 49,
          height: 49,
          width: '100%',
          zIndex: 200,
        }}
      />

      <Input
        value={time}
        placeholder={
          isLoading ? 'Loading...' : data ? 'Choose time' : 'No Data'
        }
        InputRightElement={<ArrowDownIconSet style={{marginRight: 10}} />}
      />
      <CustomActionSheet
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <Layer>
          {data?.map(item => {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 49,
                  justifyContent: 'center',
                  padding: 8,
                }}
                onPress={() => [
                  setTime(item?.value),
                  setIsModalVisible(false),
                ]}>
                <Typography>{item?.label}</Typography>
              </TouchableOpacity>
            );
          })}
        </Layer>
      </CustomActionSheet>
    </Layer>
  );
};

export default ChooseTime;

const styles = StyleSheet.create({});
