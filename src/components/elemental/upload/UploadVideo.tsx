import React, { useState } from 'react';
import { View, Pressable, SafeAreaView, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base';

import { useUploadFile } from '../hooks/useUploadFile';

const UploadVideo = (props) => {
  const [video, setVideo] = useState('');

  const { mutate: uploadFileMutate } = useUploadFile();

  const onPress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
    });
    if (result) {
      const fileUri = result.assets[0].uri;

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

      setVideo(fileUri);
    }
  };

  return (
    <SafeAreaView>
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
          }}
        >
          <View
            style={{
              marginRight: 20,
            }}
          >
            <Icon as={FontAwesome} name="video-camera" size={30} />
          </View>
          <View>
            <Text>Upload Video</Text>
          </View>
        </Pressable>
        {video && (
          <View>
            <Text>Video Uploaded</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadVideo;
