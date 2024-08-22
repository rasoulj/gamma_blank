import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {formatPrice} from '~/utils/helper/formatPrice';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import VStack from '../../atoms/VStack';
import {HStack, Image, Layer, getColor, relativeTime} from '../../elemental';
import DeleteConfirmatonModal from './Modals/DeleteConfirmation';

const MySellsOrderItem = ({
  item,
  type = 'current',
}: {
  item: any;
  type: 'current' | 'past';
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const productImages = useMemo(() => {
    return item?.shoppingCardSellers?.[0]?.shoppingCardDetails?.map(
      i => i?.product?.productImages?.[0]?.imageUrl,
    );
  }, [item]);

  return (
    <Layer style={styles?.container}>
      <Layer style={styles.buyerContainer}>
        <Image
          source={{
            uri: item?.user?.photoUrl,
          }}
          style={styles.buyerImage}
        />
        <Typography style={styles?.buyerText}>
          Buyer Name: {item?.user?.fullName}
        </Typography>
      </Layer>
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
      <Layer style={styles.productContainer}>
        {productImages?.map(i => {
          return (
            <Image
              source={{
                uri: i,
              }}
              style={styles.productImages}
            />
          );
        })}
      </Layer>
      <HStack
        style={styles.detailsContainer}
        mt={3}
        justifyContent={'space-between'}>
        <VStack style={styles.detailsColumn}>
          <Typography style={styles.orderDateText}>
            Order Date :
            <Typography style={styles.orderDateValue}>
              {' ' +
                relativeTime(
                  item?.orderDate || item?.createdDate,
                  'MM/DD/YYYY',
                )}
            </Typography>
          </Typography>

          <Typography style={styles?.containerText}>
            Time :
            <Typography style={styles?.titleText}>
              {' ' +
                relativeTime(item?.orderDate || item?.createdDate, 'HH:MM')}
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

      <DeleteConfirmatonModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </Layer>
  );
};

export default MySellsOrderItem;

const styles = StyleSheet.create({
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
  buyerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buyerImage: {width: 32, height: 32, borderRadius: 100, marginRight: 8},
  buyerText: {fontSize: 14, fontWeight: '500'},
  productContainer: {flexDirection: 'row'},
  productImages: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});
