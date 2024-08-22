import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  CloseIconSet,
  Divider,
  RateReview,
  RefreshIconSet,
  StarIconSet,
  TruckIconSet,
  Typography,
  useNavigate,
} from '~/components/elemental';
import CancelationOptionsModal from './CancelationOptionsModal';

const TrackingOrderItemModal = ({
  item,
  isVisible,
  onClose,
  trackingId,
  orderStatus,
  shoppingCardSellerId,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  trackingId: number;
  orderStatus;
  shoppingCardSellerId;
}) => {
  const {navigateWithName} = useNavigate();
  const [showRateReview, setShowRateReview] = useState(false);
  const [showCancelationOptions, setShowCancelationOptions] = useState(false);
  const orderedStatusItems = [
    {
      title: 'Tracking & Details',
      onPress: () =>
        navigateWithName('Tracking', {
          routeName: 'detail',
          item: {id: trackingId, shoppingCardSellerId},
        }),
      color: '',
      icon: <TruckIconSet />,
    },
    {
      title: 'Write a Review',
      onPress: () => [setShowRateReview(true)],
      color: '',
      icon: <StarIconSet />,
    },
    (orderStatus === 'ORDERED')
      ? {
          title: 'Cancel This Item',
          onPress: () => [setShowCancelationOptions(true)],
          color: 'error.500',
          icon: <CloseIconSet color={'error.500'} />,
        }
      : {
          title: 'Return This Item',
          onPress: () => [
            navigateWithName('product return', {item: {...item, trackingId}}),
            onClose(),
          ],
          color: '',
          icon: <RefreshIconSet />,
        },
  ];

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      {orderedStatusItems?.map((i, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 && <Divider />}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={i?.onPress}>
              {i?.icon}
              <Typography color={i?.color} style={styles.optionText}>
                {i?.title}
              </Typography>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
      <RateReview
        targetName={'Product'}
        isOpen={showRateReview}
        onClose={() => setShowRateReview(false)}
        id={item?.productId}
        hasReview={true}
        hasTitle={true}
        itemName={item?.product?.title}
      />
      <CancelationOptionsModal
        item={item}
        isVisible={showCancelationOptions}
        onClose={() => [setShowCancelationOptions(false), onClose()]}
      />
    </CustomActionSheet>
  );
};

export default TrackingOrderItemModal;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 10,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
  },
});
