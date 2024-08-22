import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Typography, VStack, getColor} from '~/components/elemental';
import VideoSolidIconSet from '~/assets/iconset/Video/videoSolid';
import DocumentTextSolidIconSet from '~/assets/iconset/Files/documentSolid-text';
import GallerySolidIconSet from '~/assets/iconset/Video/gallerySolid';

const SelectTextType = ({
  isVisible,
  onClose,
  setTextType,
}: {
  isVisible: boolean;
  onClose: () => void;
  setTextType: (type: string) => void;
}) => {
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <Typography
          fontSize="lg"
          fontWeight={'700'}
          color={'gray.800'}
          alignSelf={'center'}>
          Text
        </Typography>
        <View style={styles.content}>
          <TouchableOpacity
            style={[styles.btnContainer, {padding: 20}]}
            onPress={() => {
              onClose();
              setTextType?.('onlyHead');
            }}>
            <Typography
              color={'gray.800'}
              fontSize="lg"
              fontWeight={'700'}
              alignSelf={'center'}>
              Heading
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              setTextType?.('textWithHead');
            }}>
            <Typography
              color={'gray.800'}
              fontSize="md"
              fontWeight={'600'}
              mb="2">
              Heading
            </Typography>
            <Typography color={'gray.800'} fontSize="xs" fontWeight={'400'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              setTextType?.('onlyText');
            }}>
            <Typography color={'gray.800'} fontSize="xs" fontWeight={'400'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,
            </Typography>
          </TouchableOpacity>
        </View>
      </CustomActionSheet>
    </>
  );
};

export default SelectTextType;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: getColor({color: 'gray.300'}),
    marginVertical: 10,
    padding: 8,
    borderRadius: 5,
  },
  content: {
    position: 'relative',
    display: 'flex',
    borderRadius: 10,
    width: '100%',
    marginVertical: 28,
    alignSelf: 'center',
  },
});
