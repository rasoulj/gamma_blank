import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {formatPrice} from '~/utils/helper/formatPrice';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import VStack from '../../atoms/VStack';
import {
  Button,
  HStack,
  Layer,
  getColor,
  relativeTime,
  useToast,
} from '../../elemental';
import DeleteConfirmatonModal from './Modals/DeleteConfirmation';
import {useBookAgain} from './hook';

const OrderHistoryItem = ({
  item,
  type = 'current',
}: {
  item: any;
  type: 'current' | 'past';
}) => {
  const queryClient = useQueryClient();
  const {toast} = useToast();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {mutate: mutateBookAgain, isLoading: isLoadingBookAgain} =
    useBookAgain();

  const bookAgain = () => {
    mutateBookAgain(
      {shoppingCardId: item?.id},
      {
        onSuccess(data: any, variables, context) {
          queryClient.invalidateQueries(['getShoppingCards'], {
            exact: false,
          });

          const reason = data?.ecommerce_bookAgain?.filter(
            i => i?.description !== 'Success',
          );
          if (reason) {
            toast({
              message: data?.ecommerce_bookAgain?.[0]?.description,
            });
          } else if (
            data?.ecommerce_bookAgain?.value ===
            'NotFound'
          ) {
            toast({
              message: 'This product already removed',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          } else {
            toast({
              message: 'Success',
            });
          }
        },
      },
    );
  };

  return (
    <Layer style={styles?.container}>
      <HStack
        style={styles.headerContainer}
        justifyContent={'space-between'}
        alignItems={'center'}
        space={2}>
        <Typography style={styles.orderNumber}>Order No: {item?.id}</Typography>
        <Card style={styles.orderStatusCard}>
          <Typography color={'gray.50'} style={styles.orderStatusText}>
            {item?.orderStatus}
          </Typography>
        </Card>
      </HStack>
      <HStack
        style={styles.detailsContainer}
        mt={3}
        justifyContent={'space-between'}>
        <VStack style={styles.detailsColumn}>
          <Typography style={styles.orderDateText}>
            Order Date :
            <Typography style={styles.orderDateValue}>
              {' ' + relativeTime(item?.orderDate || item?.createdDate, 'MM/DD/YYYY')}
            </Typography>
          </Typography>

          <Typography style={styles?.containerText}>
            Time :
            <Typography style={styles?.titleText}>
              {' ' + relativeTime(item?.orderDate || item?.createdDate, 'HH:MM')}
            </Typography>
          </Typography>
          {item?.email && (
            <Typography style={styles?.containerText}>
              Shop :
              <Typography style={styles?.titleText}>{item?.email}</Typography>
            </Typography>
          )}
        </VStack>
        <VStack alignSelf={'flex-end'}>
          <Typography style={styles?.totalAmountText}>
            ${formatPrice(item?.purchasePrice)}
          </Typography>
        </VStack>
      </HStack>
      {item?.orderStatus !== 'CANCELLED' && (
        <Button
          isLoading={isLoadingBookAgain}
          style={styles.orderAgainButton}
          onPress={bookAgain}>
          <Typography
            color={'background.500'}
            style={styles.orderAgainButtonText}>
            Order again
          </Typography>
        </Button>
      )}
      <DeleteConfirmatonModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </Layer>
  );
};

export default OrderHistoryItem;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
    padding: 16,
    marginVertical: 8,
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  orderNumber: {
    fontWeight: 'bold',
  },
  orderStatusCard: {
    backgroundColor: getColor({color: 'secondary.500'}),
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 40,
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  detailsColumn: {
    flex: 1,
  },
  orderDateText: {
    fontSize: 14,
    fontWeight: '400',
  },
  orderDateValue: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemCountText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  itemCountValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalAmountContainer: {
    alignSelf: 'flex-end',
  },
  totalAmountText: {
    fontWeight: 'bold',
  },
  orderAgainButton: {
    height: 36,
    marginTop: 10,
  },
  orderAgainButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 15,
  },
  containerText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
