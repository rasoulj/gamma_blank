import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, getColor} from '~/components/elemental';

import {useQueryClient} from 'react-query';
import {useEnableNotificationUser} from '../../CourseList/hook';

const TurnNotifModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useEnableNotificationUser();

  const handleNotifOn = () => {
    mutate(
      {targetUserId: item?.id},
      {
        onSuccess() {
          queryClient.invalidateQueries('getDisabledNotification');
          onClose();
        },
      },
    );
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.content}>
        <Typography style={styles.title}>Confirmation</Typography>
        <Typography style={styles.desc}>
          Elevate your learning experience! Enable Educator Notifications to
          stay in the loop on their exciting new courses and quizzes. Ready to
          receive timely updates?
        </Typography>
        <Layer
          data-id="button_box"
          data-name="Layer"
          style={styles.rowView}
          data-parent="content-delete-layer">
          <Button
            variant={'outline'}
            style={styles.btn}
            onPress={() => {
              onClose();
            }}>
            <Typography
              color={'primary.500'}
              fontSize="14px"
              fontWeight={'700'}
              lineHeight={17}>
              No
            </Typography>
          </Button>
          <Button
            isLoading={isLoading}
            style={styles.btn}
            bgColor="primary.500"
            variant="solid"
            onPress={() => {
              handleNotifOn();
            }}>
            <Typography
              color={'gray.50'}
              fontSize="14px"
              fontWeight={'700'}
              lineHeight={17}>
              Yes
            </Typography>
          </Button>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default TurnNotifModal;

const styles = StyleSheet.create({
  btn: {borderRadius: 10, width: '48%', height: 36},
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
  },
  rowView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 24,
    width: '100%',
  },
  desc: {
    fontSize: 14,
    marginTop: 16,
    lineHeight: 19,
    fontWeight: '500',
    color: getColor({color: 'grey.800'}),
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: getColor({color: 'grey.800'}),
    lineHeight: 24,
  },
});
