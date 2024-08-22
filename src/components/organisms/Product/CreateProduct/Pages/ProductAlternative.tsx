import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';
import {
  ArrowDownIconSet,
  ArrowUpIconSet,
  Button,
  CustomSwitch,
  FlatList,
  Input,
  Layer,
  Typography,
  getColor,
} from '~/components/elemental';

const ProductAlternative = ({productData, setProductData}) => {
  function generateCombinations(
    originalList,
    currentIndex = 0,
    currentCombination = {},
  ) {
    if (currentIndex === originalList?.length) {
      const combinationWithId = {...currentCombination};
      combinationsList.push(combinationWithId);
      return;
    }

    const currentObject = originalList?.[currentIndex];

    currentObject?.values?.forEach?.(item => {
      const updatedCombination = {...currentCombination};

      updatedCombination[currentObject?.name] = item;

      generateCombinations(originalList, currentIndex + 1, updatedCombination);
    });
  }

  let combinationsList = [];
  generateCombinations(productData?.attribute);

  let finalList = [];
  const generateAlterativeList = list => {
    const attributesList = list?.map(i =>
      productData?.attribute?.map(a => {
        return {name: a?.name, value: i[a?.name]};
      }),
    );
    finalList = attributesList.map((i, index) => {
      return {
        attributes: i,
        quantity: productData?.alternates?.[index]?.quantity || 1,
        outOfStock: productData?.alternates?.[index]?.outOfStock || false,
      };
    });
  };
  generateAlterativeList(combinationsList);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Typography style={styles.title}>Product Alternative</Typography>
        {combinationsList?.map((obj, index) => {
          const [showMore, setShowMore] = useState(index === 0 ? true : false);

          return (
            <Layer style={styles.layer} key={index}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => setShowMore(!showMore)}>
                {showMore ? <ArrowUpIconSet /> : <ArrowDownIconSet />}

                <Typography style={styles.text}>
                  Alternative {index + 1}
                </Typography>
              </TouchableOpacity>

              {showMore && (
                <View>
                  <FlatList
                    data={productData?.attribute}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({item}) => (
                      <Layer style={styles.attributeContainer}>
                        <Typography style={styles.attributeName}>
                          {item?.name} :{' '}
                          <Typography style={styles.attributeValue}>
                            {obj?.[item?.name]}
                          </Typography>
                        </Typography>
                      </Layer>
                    )}
                  />

                  <Typography style={styles.quantityTitle}>Quantity</Typography>
                  <Input
                    defaultValue={String(
                      productData?.alternates?.[index]?.quantity || 1,
                    )}
                    placeholder="Number of items"
                    onChangeText={quality =>
                      (finalList[index].quantity = Number(quality))
                    }
                  />

                  <Layer style={styles.outOfStockContainer}>
                    <Typography style={styles.outOfStockTitle}>
                      Out of stock
                    </Typography>
                    <CustomSwitch
                      switchValue={Boolean(
                        productData?.alternates?.[index]?.outOfStock || 0,
                      )}
                      onValueChange={value =>
                        (finalList[index].outOfStock = value)
                      }
                    />
                  </Layer>
                </View>
              )}
            </Layer>
          );
        })}
      </ScrollView>
      <Button
        style={styles.button}
        onPress={() => setProductData({...productData, alternates: finalList})}>
        Next
      </Button>
    </>
  );
};

export default ProductAlternative;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
  },
  layer: {
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
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginTop: 16,
  },
  attributeContainer: {
    flex: 1,
  },
  attributeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  attributeValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
    marginTop: 24,
  },
  outOfStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  outOfStockTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  button: {
    bottom: 10,
  },
});
