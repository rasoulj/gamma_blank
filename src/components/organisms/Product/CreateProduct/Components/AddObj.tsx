import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker, {types} from 'react-native-document-picker';

import {
  AddIconSet,
  CloseIconSet,
  Layer,
  TickIconSet,
  Typography,
  deviceWidth,
  getColor,
} from '~/components/elemental';
import {uploadFile} from '~/utils/fileUploader';

const AddObj = ({attachedFiles, setAttachedFiles}) => {
  const [isLoading, setIsLoading] = useState(false);

  const FilePiker = () => {
    DocumentPicker.pickSingle({
      mode: 'import',
      allowMultiSelection: false,
      type:
        'public.geometry-definition-format' ||
        'public.text' ||
        'public.data' ||
        'public.item' ||
        'public.3d-content' ||
        '.obj',
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
            const allFiles = [fileName?.uploadedUrl];
            setIsLoading(false);
            setAttachedFiles(allFiles);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    setIsLoading(false);
  };
  return (
    <Layer style={{marginTop: 24}}>
      <Typography style={{fontSize: 18, fontWeight: '500'}}>
        Add .obj File of your product
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '400'}}>
        You can add the 3d model of your product, so users can use their camera
        to see the real size of product in the environment.
      </Typography>
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
        {attachedFiles && (
          <TouchableOpacity
            onPress={() => setAttachedFiles('')}
            style={{
              width: 32,
              height: 32,
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: getColor({color: 'background.500'}),
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 3,
            }}>
            <CloseIconSet width={20} height={20} color={'error.500'} />
          </TouchableOpacity>
        )}
        {isLoading && <ActivityIndicator size={'small'} />}

        {!isLoading && !attachedFiles && (
          <AddIconSet width={42} height={42} color={'gray.50'} />
        )}
        {attachedFiles && (
          <TickIconSet width={42} height={42} color={'gray.50'} />
        )}
      </TouchableOpacity>
    </Layer>
  );
};

export default AddObj;

const styles = StyleSheet.create({});
