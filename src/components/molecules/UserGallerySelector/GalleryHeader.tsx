import React, {useRef} from 'react';
import {
  ArrowDownIcon,
  ArrowUpIconSet,
  CameraIconSet,
  CopyIconSet,
  HStack,
  Typography,
  VStack,
  useNavigate,
} from '~/components/elemental';
import {TouchableOpacity} from 'react-native';
import AlbumsSheet from './AlbumsSheet';
import {model} from '~/data/model';

const configs = model?.metaData?.configs?.socialPost ?? {
  description: true,
  uploadPhoto: true,
  uploadVideo: true,
  multiMediaUpload: true,
  uploadFromGallery: true,
  uploadFromCamera: true,
};

const GalleryHeader = ({
  albums,
  setGroupName,
  onNextPress,
  groupName,
  enableMultiSelect,
  setEnableMultiSelect,
}: {
  albums?: any;
  setGroupName?: any;
  groupName?: string;
  onNextPress?: any;
  enableMultiSelect?: boolean;
  setEnableMultiSelect?: any;
}) => {
  const albumsRef = useRef();

  const {navigateWithName} = useNavigate();
  const onCameraPress = () => {
    navigateWithName('AddStory', {type: 'Post'});
  };
  const onOpenAlbums = () => albumsRef?.current?.onOpen();

  return (
    <>
      <HStack
        px="1"
        py="2"
        borderTopRadius="20"
        justifyContent="space-between"
        alignItems="center"
        bgColor="background.500">
        <HStack space="4">
          {configs?.uploadFromGallery && (
            <TouchableOpacity onPress={onOpenAlbums}>
              <HStack
                p="2"
                space="3"
                borderColor="gray.500"
                borderWidth="1"
                borderRadius="10">
                <Typography fontWeight={400} fontSize="sm" color="gray.800">
                  {groupName ?? 'Gallery'}
                </Typography>
                <VStack>
                  <ArrowUpIconSet width="10" height="10" />
                  <ArrowDownIcon width="10" height="10" />
                </VStack>
              </HStack>
            </TouchableOpacity>
          )}
          {configs?.uploadFromCamera && (
            <TouchableOpacity onPress={onCameraPress}>
              <VStack
                w="36"
                h="36"
                borderRadius="18"
                borderWidth="2"
                alignItems="center"
                justifyContent="center"
                bgColor={'primary.500'}
                borderColor="primary.500">
                <CameraIconSet
                  color={'#fff'}
                  width={16}
                  height={16}
                  strokeWidth={2}
                />
              </VStack>
            </TouchableOpacity>
          )}
          {configs?.multiMediaUpload && (
            <TouchableOpacity onPress={setEnableMultiSelect}>
              <VStack
                w="36"
                h="36"
                borderRadius="18"
                borderWidth="2"
                alignItems="center"
                justifyContent="center"
                bgColor={enableMultiSelect ? 'primary.500' : undefined}
                borderColor="primary.500">
                <CopyIconSet
                  color={enableMultiSelect ? 'background.100' : 'primary.500'}
                  size="18"
                />
              </VStack>
            </TouchableOpacity>
          )}
        </HStack>
        <TouchableOpacity onPress={onNextPress} activeOpacity={0.8}>
          <VStack
            w="107"
            h="36"
            backgroundColor="primary.500"
            alignItems="center"
            justifyContent="center"
            borderRadius="10">
            <Typography
              fontWeight={'700'}
              fontSize="sm"
              color="gray.50"
              alignSelf="center">
              Next
            </Typography>
          </VStack>
        </TouchableOpacity>
      </HStack>
      <AlbumsSheet data={albums} ref={albumsRef} onSelectItem={setGroupName} />
    </>
  );
};

export default GalleryHeader;
