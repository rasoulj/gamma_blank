import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  HStack,
  Input,
  Layer,
  Typography,
  View,
  deviceHeight,
  deviceWidth,
  getColor,
  scale,
} from '~/components/elemental';
import {CloseIcon} from '../../../elemental';

const Features = ({
  features,
  setFeatures,
  title,
}: {
  features: any;
  setFeatures: any;
  title: string;
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');

  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addFeatures = (key, value) => {
    let temp = features;
    temp.push({
      key,
      value,
      sectionId: 8,
      itemId: 0,
    });
    setFeatures(temp);
  };
  const removeFeature = key => {
    setTimeout(() => {
      setFeatures(features?.filter(i => i?.key !== key));
    }, 100);
  };

  return (
    <>
      <View
        style={{
          marginTop: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography
          style={{
            fontSize: scale(14),
            fontWeight: '500',
          }}>
          {title}
        </Typography>
        <TouchableOpacity onPress={toggleModal}>
          <Typography
            color={'secondary.500'}
            style={{fontSize: 14, fontWeight: '500'}}>
            + Add new
          </Typography>
        </TouchableOpacity>
      </View>

      <Typography style={{marginVertical: 8, fontSize: 14, fontWeight: '400'}}>
        To enhance your product's appeal and inform potential buyers, add
        specific features for your product: First, write the Feature like
        “Energy”, then add explanation for it. like A+++. and complete your
        feature table.
      </Typography>
      {features?.map((el, index) => (
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: getColor({color: 'primary.100'}),
            //   alignSelf: 'flex-start',
            borderRadius: 10,
            paddingVertical: 13,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => removeFeature(el?.key)}>
            <CloseIcon
              width={12}
              color={getColor({color: 'gray.800'})}
              style={{marginEnd: 10}}
            />
          </TouchableOpacity>
          <Typography
            numberOfLines={1}
            color={getColor({color: 'gray.800'})}
            style={{
              flex: 1,
              fontWeight: '800',
            }}>
            {el?.key}
          </Typography>
          <Typography
            numberOfLines={1}
            color={getColor({color: 'secondary.500'})}
            style={{
              // width: '50%',
              fontWeight: '600',
            }}>
            {el?.value}
          </Typography>
        </View>
      ))}

      <CustomActionSheet
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        backgroundColor={getColor({color: 'background.500'})}>
        <View
          style={{
            width: deviceWidth * 0.9,
            borderRadius: 15,
            alignSelf: 'center',
            paddingHorizontal: 15,
            marginBottom: keyboardShown ? deviceHeight / 2.5 : 40,
          }}>
          <Typography
            style={{
              marginBottom: 10,
              fontWeight: '400',
              fontSize: 17,
              alignSelf: 'center',
            }}>
            Add
          </Typography>
          <HStack width={'100%'} justifyContent={'center'} space="4">
            <Input
              placeholder={'Title'}
              value={text}
              onChangeText={setText}
              style={{
                flex: 1,
                width: '47%',
                paddingHorizontal: 15,
                marginHorizontal: 10,
                marginTop: 10,
              }}
            />
            <Input
              placeholder={'Description'}
              value={price}
              onChangeText={setPrice}
              style={{
                paddingHorizontal: 15,
                marginHorizontal: 10,
                marginTop: 10,
                width: '47%',
              }}
            />
          </HStack>
          <TouchableOpacity
            onPress={() => {
              if (text.length > 0 && price.length > 0) {
                addFeatures(text, price);
                setText('');
                setPrice('');
              }
            }}>
            {text.length > 0 && (
              <Typography
                textAlign="left"
                mb="4"
                mt="2"
                fontWeight={'400'}
                style={{fontWeight: '400', fontSize: 14, marginTop: 10}}
                color={getColor({color: 'secondary.500'})}>
                + Add item
              </Typography>
            )}
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: getColor({color: 'background.600'}),
              marginTop: 15,
            }}
          />
          {features?.map((el, index) => (
            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: getColor({color: 'primary.100'}),
                //   alignSelf: 'flex-start',
                borderRadius: 10,
                paddingVertical: 13,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity onPress={() => removeFeature(el?.key)}>
                <CloseIcon
                  width={12}
                  color={getColor({color: 'gray.800'})}
                  style={{marginEnd: 10}}
                />
              </TouchableOpacity>
              <Typography
                numberOfLines={1}
                color={getColor({color: 'gray.800'})}
                style={{
                  flex: 1,
                  fontWeight: '800',
                }}>
                {el?.key}
              </Typography>
              <Typography
                numberOfLines={1}
                color={getColor({color: 'secondary.500'})}
                style={{
                  // width: '50%',
                  fontWeight: '600',
                }}>
                {el?.value}
              </Typography>
            </View>
          ))}
          <Layer
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Button
              variant="outline"
              style={{
                flex: 1,
                marginRight: 10,
                borderWidth: 2,
                borderColor: getColor({color: 'primary.400'}),
                backgroundColor: getColor({color: 'background.500'}),
                marginTop: 20,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={toggleModal}>
              Cancel
            </Button>
            <Button
              style={{
                flex: 1,
                marginLeft: 10,
                marginTop: 20,
                borderWidth: 2,
                borderColor: getColor({color: 'primary.400'}),
              }}
              onPress={() => {
                if (text.length > 0 && price.length > 0) {
                  addFeatures(text, price);
                  setText('');
                  setPrice('');
                  setModalVisible(false);
                } else {
                  setModalVisible(false);
                }
              }}>
              Save
            </Button>
          </Layer>
        </View>
      </CustomActionSheet>
    </>
  );
};

export default Features;
