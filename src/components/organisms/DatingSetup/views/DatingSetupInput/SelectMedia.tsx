import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  AlertButton,
  ImageBackground,
} from 'react-native';
import {
  Center,
  CloseIconSet,
  HStack,
  Layer,
  Pressable,
  Typography,
  deviceWidth,
  getColor,
} from '~/components/elemental';
import ImagePicker, {Options} from 'react-native-image-crop-picker';

import {StyleSheet} from 'react-native';

import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import {isVideo} from '~/utils/isVideo';
import {PlusIcon, PlusLargeIcon} from '~/assets/icons/dating';

const photoOptions: Options = {
  mediaType: 'photo',
  width: 600,
  height: 600,
  cropping: true,
  includeBase64: true,
  includeExif: true,
};

const videoOptions: Options = {
  mediaType: 'video',
};

function CustomCloseIcon() {
  return (
    <Center
      position="absolute"
      right={2}
      top={2}
      borderRadius={80}
      w={30}
      h={30}
      backgroundColor="rgba(255, 255, 255, 0.70)">
      <CloseIconSet width={20} height={20} color={'error.500'} />
    </Center>
  );
}

function AddIcon({large}) {
  return !large ? <PlusIcon /> : <PlusLargeIcon />;
}

function useSelectMedia(onSetImage: (index: number, url?: string) => void) {
  const [loading, setLoading] = useState(-1);

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

  const onChangeImage = async (image: any, index: number) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        setLoading(-1);
        onSetImage(index, successData?.uploadedUrl);
      },
    });
  };

  const chooseImage = async (index: number) => {
    setLoading(index);
    ImagePicker.openPicker(photoOptions)
      .then((image: any) => {
        onChangeImage(image, index);
      })
      .catch(() => {
        setLoading(-1);
      });
  };

  const chooseVideo = async (index: number) => {
    setLoading(index);
    ImagePicker.openPicker(videoOptions)
      .then((image: any) => {
        onChangeImage(image, index);
      })
      .catch(() => {
        setLoading(-1);
      });
  };

  const recordVideo = (index: number) => {
    setLoading(index);
    ImagePicker.openCamera(videoOptions)
      .then((image: any) => {
        onChangeImage(image, index);
      })
      .catch(() => {
        setLoading(-1);
      });
  };

  const takePicture = (index: number) => {
    setLoading(index);
    ImagePicker.openCamera(photoOptions)
      .then((image: any) => {
        onChangeImage(image, index);
      })
      .catch(() => {
        setLoading(-1);
      });
  };

  const onPress = (index: number) => {
    const recVideo =
      index == 0
        ? []
        : [{text: 'Record Video', onPress: () => recordVideo(index)}];
    const selVideo =
      index == 0
        ? []
        : [{text: 'Choose Video', onPress: () => chooseVideo(index)}];

    var actions: AlertButton[] = [
      {text: 'Take Picture', onPress: () => takePicture(index)},
      {text: 'Choose Picture', onPress: () => chooseImage(index)},
      ...recVideo,
      ...selVideo,
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => setLoading(-1),
      },
    ];

    Alert.alert('Upload', 'Select a source', actions);
  };

  return {
    onPress,
    loading,
  };
}

function CoverPhoto({large}) {
  return (
    large && (
      <Layer style={styles.cover}>
        <Typography style={styles.coverText}>Cover Photo</Typography>
      </Layer>
    )
  );
}

function AddPhoto({
  index,
  loading,
  value,
  onPress,
  onClear,
}: {
  index: number;
  loading?: number;
  value?: string[];
  onPress?: (index: number) => void;
  onClear?: (index: number) => void;
}): JSX.Element {
  const [uri, setUri] = useState(value[index]);

  useEffect(() => {
    if (!isVideo(value[index])) {
      setUri(value[index]);
    } else {
      createThumbnailVideo(value[index]).then(thumb => {
        setUri(thumb);
      });
    }
  }, [value[index]]);

  const large = index === 0;

  return (
    <Center style={large ? styles.w2 : styles.w1} bgColor="primary.200">
      {!!uri && (
        <ImageBackground source={{uri}} style={styles.fillMax}>
          <Pressable style={styles.relPos} onPress={() => onClear(index)}>
            <CustomCloseIcon />
          </Pressable>
        </ImageBackground>
      )}
      {!uri && (
        <Pressable style={styles.full} onPress={() => onPress(index)}>
          {loading === index ? (
            <ActivityIndicator
              color={getColor({color: 'gray.50'})}
              size={large ? 'large' : 'small'}
            />
          ) : (
            <AddIcon large={large} />
          )}
        </Pressable>
      )}

      <CoverPhoto large={large} />
    </Center>
  );
}

export function SelectMedia({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: any[]) => void;
}): JSX.Element {
  const _onChange = (index: number, url?: string) => {
    const val = [...value];
    val[index] = url;
    onChange(val);
  };

  const onClear = (index: number) => _onChange(index, '');

  const {onPress, loading} = useSelectMedia(_onChange);

  return (
    <Layer>
      <HStack>
        <AddPhoto
          index={0}
          loading={loading}
          value={value}
          onPress={onPress}
          onClear={onClear}
        />
        <Layer>
          <AddPhoto
            index={1}
            loading={loading}
            value={value}
            onPress={onPress}
            onClear={onClear}
          />
          <AddPhoto
            index={2}
            loading={loading}
            value={value}
            onPress={onPress}
            onClear={onClear}
          />
        </Layer>
      </HStack>
      <Layer style={styles.row}>
        <AddPhoto
          index={3}
          loading={loading}
          value={value}
          onPress={onPress}
          onClear={onClear}
        />
        <AddPhoto
          index={4}
          loading={loading}
          value={value}
          onPress={onPress}
          onClear={onClear}
        />
        <AddPhoto
          index={5}
          loading={loading}
          value={value}
          onPress={onPress}
          onClear={onClear}
        />
      </Layer>
    </Layer>
  );
}

const w1 = deviceWidth / 3 - 24;
const w2 = (deviceWidth * 2) / 3 - 48;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  fillMax: {
    width: '100%',
    height: '100%',
  },

  w1: {
    width: w1,
    height: w1,
    borderColor: '#fff',
    borderWidth: 1,
  },

  w2: {
    borderColor: '#fff',
    borderWidth: 1,
    width: w2,
    height: w2,
  },

  full: {},

  relPos: {
    position: 'absolute',
    right: 1,
    top: 1,
  },

  img: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },

  cover: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: getColor({color: 'primary.100'}),
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 16,
  },

  coverText: {fontSize: 12, fontWeight: '500'},
});
