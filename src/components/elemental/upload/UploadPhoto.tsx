import React, {useState} from 'react';
import {View, Pressable, SafeAreaView, Text, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';

import {useUploadFile} from '../hooks/useUploadFile';

const UploadPhoto = () => {
  const [image, setImage] = useState('');

  const {mutate: uploadFileMutate} = useUploadFile();

  const onPress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result) {
      const imageUri = result.assets[0].uri;

      const file = {
        path: result.assets[0].uri,
        mime: result.assets[0].type,
        filename: result.assets[0].fileName,
      };

      uploadFileMutate(file, {
        onSuccess: (successData: any) => {
          console.log('successData,', successData);
        },
      });

      setImage(imageUri);
    }
  };

  const renderImage = () => {
    if (image) {
      return (
        <View>
          <Image
            style={{
              margin: 10,
              height: 300,
              resizeMode: 'contain',
            }}
            source={{
              uri: image,
            }}
          />
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 15,
          backgroundColor: '#ccc',
          borderRadius: 10,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginRight: 20,
          }}>
          <Icon as={FontAwesome} name="camera" size={30} />
        </View>
        <View>
          <Text>Upload Photo</Text>
        </View>
      </Pressable>
      {renderImage()}
    </View>
  );
};

export default UploadPhoto;
