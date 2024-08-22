import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker, {types} from 'react-native-document-picker';
import Video from 'react-native-video';

import {
  AddIconSet,
  FlatList,
  Layer,
  Typography,
  deviceWidth,
  getColor,
} from '~/components/elemental';

import {uploadFile} from '~/utils/fileUploader';
import { model } from '~/data/model';

const ProductConfig = model?.metaData?.configs?.product;

const AddVideos = ({attachedFiles, setAttachedFiles}) => {
  const [isLoading, setIsLoading] = useState(false);
  const FilePiker = () => {
    DocumentPicker.pickSingle({
      mode: 'import',
      allowMultiSelection: false,
      type: types.video,
    })
      .then(data => {
        setIsLoading(true);
        uploadFile(
          {
            path: data.uri,
            filename: data?.name,
            mime: data?.type,
          },
          i => {
            console.log(i);
          },
        )
          .then((fileName: any) => {
            console.log('fileurl', fileName?.uploadedUrl);
            const allFiles = attachedFiles
              ? [...attachedFiles, fileName?.uploadedUrl]
              : [fileName?.uploadedUrl];

            setIsLoading(false);
            setAttachedFiles(allFiles);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return (
      <Video
        source={{
          uri: item,
        }}
        style={styles.video}
        muted={false}
        repeat={false}
        paused={true}
        onLoadError={er => console.log('err', er)}
        controls
      />
    );
  };
  const ListFooterComponent = () => {
    return (
      <TouchableOpacity
        style={{
          width: deviceWidth / 3 - 24,
          height: deviceWidth / 3 - 24,
          backgroundColor: getColor({color: 'primary.200'}),
          alignItems: 'center',
          justifyContent: 'center',
          margin: 1,
          marginTop: 8,
        }}
        onPress={FilePiker}>
        {isLoading && <ActivityIndicator size={'small'} />}

        {!isLoading && <AddIconSet width={42} height={42} color={'gray.50'} />}
      </TouchableOpacity>
    );
  };

  return (
    <Layer style={{marginTop: 24}}>
      <Typography style={{fontSize: 18, fontWeight: '500'}}>
        Add Videos
        {ProductConfig?.videoIsRequired !== false && (
          <Typography color={'error.500'}>*</Typography>
        )}
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '400'}}>
        Size of videos should be 100mb maximum.
      </Typography>
      <FlatList
        horizontal
        style={{}}
        data={attachedFiles}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    </Layer>
  );
};

export default AddVideos;

const styles = StyleSheet.create({
  video: {
    width: deviceWidth / 3 - 24,
    height: deviceWidth / 3 - 24,
    marginTop: 8,
    marginRight: 1,
    backgroundColor: '#222',
  },
});
