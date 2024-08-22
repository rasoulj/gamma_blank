import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ArrowDownIconSet,
  ArrowUpIconSet,
  Button,
  CloseIconSet,
  Layer,
  Typography,
  getColor,
} from '~/components/elemental';
import AddAnAttributeModal from '../Modals/AddAnAttributeModal';
import AddItemsModal from '../Modals/AddItemsModal';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const ProductAttribute = ({productData, setProductData}) => {
  const [showMore, setShowMore] = useState('');
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false);
  const [itemModelTitle, setItemModelTitle] = useState('');

  const [attribute, setAttribute] = useState([{name: 'Color', values: []}]);

  useEffect(() => {
    if (productData?.attribute) {
      setAttribute(
        productData?.attribute?.map(i => ({
          values:
            typeof i?.values === 'string' ? JSON.parse(i?.values) : i?.values,
          name: i?.name,
        })),
      );
    }
  }, []);

  const rightSwipeActions = name => {
    return (
      <TouchableOpacity
        style={{
          width: 24,
          height: 24,
          padding: 2,
          borderRadius: 100,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginLeft: 20,
          marginRight: 10,
        }}
        onPress={() =>
          setAttribute(attribute?.filter(item => item?.name !== name))
        }>
        <CloseIconSet width={20} height={20} color={'gray.50'} />
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Typography style={styles.productAttrText}>
        Product Attributes
      </Typography>
      <Button
        variant={'outline'}
        style={{marginVertical: 24}}
        onPress={() => setIsAttributeModalVisible(true)}>
        Add an Attribute
      </Button>
      {attribute?.map(item => {
        return (
          <Swipeable
            renderRightActions={() =>
              item?.name === 'Color' ? (
                <View
                  style={{
                    width: 24,
                    height: 24,
                  }}></View>
              ) : (
                rightSwipeActions(item?.name)
              )
            }>
            <Layer
              style={{
                backgroundColor: getColor({color: 'background.500'}),
                borderRadius: 15,
                shadowColor: getColor({color: 'gray.800'}),
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 5,
                padding: 16,
                marginVertical: 8,
                marginHorizontal: 8,
              }}>
              <Layer
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() =>
                    setShowMore(item?.name === showMore ? '' : item?.name)
                  }>
                  {showMore === item?.name ? (
                    <ArrowUpIconSet />
                  ) : (
                    <ArrowDownIconSet />
                  )}

                  <Typography
                    style={{fontSize: 16, fontWeight: '600', marginLeft: 8}}>
                    {item?.name}
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setItemModelTitle(item?.name)}>
                  <Typography
                    color={'secondary.500'}
                    style={{fontSize: 14, fontWeight: '500'}}>
                    + Add options
                  </Typography>
                </TouchableOpacity>
              </Layer>

              {showMore === item?.name &&
                item?.values?.map?.(i => {
                  return (
                    <Layer
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: 32,
                        paddingTop: 16,
                      }}>
                      <Typography
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        {i}
                      </Typography>
                      <TouchableOpacity
                        style={{
                          padding: 2,
                          borderRadius: 100,
                          backgroundColor: 'red',
                        }}
                        onPress={() =>
                          setAttribute([
                            ...attribute?.filter(a => a?.name !== item?.name),
                            {
                              name: item?.name,
                              values: item?.values?.filter(a => a !== i),
                            },
                          ])
                        }>
                        <CloseIconSet
                          width={20}
                          height={20}
                          color={'gray.50'}
                        />
                      </TouchableOpacity>
                    </Layer>
                  );
                })}
            </Layer>
          </Swipeable>
        );
      })}

      <Button
        disabled={attribute?.[0]?.values?.length === 0}
        bgColor={
          attribute?.[0]?.values?.length === 0
            ? getColor({color: 'primary.300'})
            : null
        }
        style={styles.button}
        onPress={() => setProductData({...productData, attribute: attribute})}>
        Next
      </Button>

      <AddItemsModal
        title={itemModelTitle}
        isVisible={itemModelTitle ? true : false}
        onClose={() => setItemModelTitle('')}
        setAttribute={data => [
          setShowMore(itemModelTitle),
          setAttribute([
            ...attribute?.filter(a => a?.name !== itemModelTitle),
            {
              name: itemModelTitle,
              values: [
                ...attribute?.filter(i => i?.name === itemModelTitle)?.[0]
                  ?.values,
                data,
              ],
            },
          ]),
        ]}
      />
      <AddAnAttributeModal
        isVisible={isAttributeModalVisible}
        onClose={() => setIsAttributeModalVisible(false)}
        setAttribute={data =>
          setAttribute([...attribute, {name: data, values: []}])
        }
      />
    </GestureHandlerRootView>
  );
};

export default ProductAttribute;

const styles = StyleSheet.create({
  container:{flex:1},
  button:{position:"absolute", bottom:10, width:"100%"},
  productAttrText:{fontSize: 16, fontWeight: '600'}
});
