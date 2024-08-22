import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Typography, VStack, getColor} from '~/components/elemental';
import VideoSolidIconSet from '~/assets/iconset/Video/videoSolid';
import DocumentTextSolidIconSet from '~/assets/iconset/Files/documentSolid-text';
import GallerySolidIconSet from '~/assets/iconset/Video/gallerySolid';

const SelectContent = ({
  isVisible,
  onClose,
  onTextPress,
  onImagePress,
  onVideoPress,
}: {
  isVisible: boolean;
  onClose: () => void;
  onTextPress: () => void;
  onImagePress: () => void;
  onVideoPress: () => void;
}) => {
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <Typography
          fontSize="lg"
          fontWeight={'700'}
          color={'gray.800'}
          alignSelf={'center'}>
          Add
        </Typography>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              onTextPress?.();
            }}>
            <VStack style={styles.iconContainer}>
              <DocumentTextSolidIconSet />
            </VStack>
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Text
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              onImagePress?.();
            }}>
            <VStack style={styles.iconContainer}>
              <GallerySolidIconSet color={getColor({color: 'primary.800'})} />
            </VStack>
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Image
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              onVideoPress?.();
            }}>
            <VStack style={styles.iconContainer}>
              <VideoSolidIconSet />
            </VStack>
            <Typography
              color={'gray.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Video
            </Typography>
          </TouchableOpacity>
        </View>
      </CustomActionSheet>
    </>
  );
};

export default SelectContent;

const styles = StyleSheet.create({
  reportTitle: {
    marginTop: 12,
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 12,
  },
  btnContainer: {
    alignItems: 'center',
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    width: '80%',
    marginVertical: 28,
    alignSelf: 'center',
  },
  iconContainer: {
    padding: 13,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
    alignItems: 'center',
  },
});
