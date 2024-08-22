import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import ShoppingBasketIcon from '~/assets/icons/CustomIcons/ShoppingBasket.icon';
import CustomCheckBox from '~/components/atoms/CustomCheckBox';
import {
  Checkbox,
  HStack,
  Layer,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import {formatPrice} from '~/utils/helper/formatPrice';

const OrderItem = ({
  item,
  selectedItem,
  haveCheckBox = true,
  onToggle,
}: {
  item: any;
  selectedItem: any;
  haveCheckBox?: boolean;
  onToggle?:() =>  void;
}) => {
  return (
    <HStack style={styles.container}>
      <HStack style={styles.innerContainer}>
        {haveCheckBox && (
          <CustomCheckBox
            onToggle={onToggle}
            isChecked={selectedItem}
            checkBoxStyle={styles.selectionIndicator}
          />
        )}
        {item?.product?.productImages[0]?.imageUrl ? (
          <Image
            source={{uri: item?.product?.productImages[0]?.imageUrl}}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <ShoppingBasketIcon width={65} />
        )}
        <VStack style={styles.textContainer}>
          <Typography style={styles.titleText}>
            {item?.product?.title}
          </Typography>
          <Layer style={styles.attributesContainer}>
            {item?.alternate?.attributes &&
              JSON?.parse(item?.alternate?.attributes)?.map((i, index) => {
                return (
                  <>
                    {index === 0 ? null : (
                      <Typography
                        color={'gray.500'}
                        style={styles.attributeSeparator}>
                        {' - '}
                      </Typography>
                    )}
                    {i?.Name === 'Color' ? (
                      <View style={styles.colorAttributeContainer}>
                        <Typography
                          color={'gray.500'}
                          style={styles.colorAttributeText}>
                          {i?.Value?.split('- ')?.[1]}
                        </Typography>
                      </View>
                    ) : (
                      <Typography
                        color={'gray.500'}
                        style={styles.attributeText}>
                        {i?.Value}
                      </Typography>
                    )}
                  </>
                );
              })}
          </Layer>
          <Typography style={styles.priceText}>
            ${formatPrice(item?.product?.price)}
          </Typography>
          <View style={styles.verticalSpacer} />
        </VStack>
      </HStack>
      <Typography style={styles.quantityText}>{item?.quantity}</Typography>
    </HStack>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 16,
    elevation: 5,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: getColor({color: 'primary.500'}),
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: getColor({color: 'primary.500'}),
  },
  productImage: {
    width: 77,
    height: 104,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: getColor({color: 'gray.400'}),
  },
  textContainer: {
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 14,
  },
  attributesContainer: {
    flexDirection: 'row',
  },
  attributeSeparator: {
    color: 'gray.500',
    fontSize: 12,
    fontWeight: '500',
  },
  colorAttributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorAttributeText: {
    color: 'gray.500',
    fontSize: 12,
    fontWeight: '500',
  },
  attributeText: {
    color: 'gray.500',
    fontSize: 12,
    fontWeight: '500',
  },
  priceText: {
    fontWeight: '700',
    fontSize: 16,
  },
  verticalSpacer: {
    height: 16,
  },
  quantityText: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
});
