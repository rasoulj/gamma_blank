import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  CustomActionSheet,
  ExportIconSet,
  HStack,
  ThreeDotsIcon,
  UserGallerySelector,
  useNavigate,
} from '~/components';
import {Typography, VStack} from '~/components/elemental';
import * as yup from 'yup';
import useHeader from '~/components/elemental/hooks/use_header';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import {model} from '~/data/model';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PostDraftModal from './DraftsModal';

const configs = model?.metaData?.configs?.socialPost ?? {
  description: true,
  uploadPhoto: true,
  uploadVideo: true,
  uploadFromGallery: true,
};

const schema = yup.object().shape({
  medias: yup.array(),
});

const PreviewPost = () => {
  const {navigateWithName} = useNavigate();
  const {socialType} = useSocialTypesConfig();

  const [visibleDraftMenu, setVisibleDraftMenu] = useState(false);
  const onCloseDraft = () => setVisibleDraftMenu(false);
  const onOpenDraftMenu = () => setVisibleDraftMenu(true);

  const [visibleDraftList, setVisibleDraftList] = useState(false);
  const onCloseDraftList = () => setVisibleDraftList(false);
  const onOpenDraftList = () => {
    onCloseDraft();
    setVisibleDraftList(true);
  };

  const icons = useMemo(() => {
    return (
      <TouchableOpacity onPress={onOpenDraftMenu}>
        <ThreeDotsIcon style={styles.menuIcon} color="gray.800" />
      </TouchableOpacity>
    );
  }, []);

  const {} = useHeader({
    hasBack: false,
    title: {
      children: 'Add Post',
      fontWeight: 'bold',
      fontSize: 'lg',
    },
    icons,
    hidden: false,
  });

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      usedTags: '',
    },
  });

  const onGallerySelect = (photos: any[]) => {
    navigateWithName('Create Post', {photos});
  };

  return (
    <>
      <VStack space="5" backgroundColor="background.200" flex="1">
        <FormProvider {...methods}>
          <UserGallerySelector
            onGallerySelect={onGallerySelect}
            name="medias"
            assetType={
              configs?.uploadVideo && configs?.uploadPhoto
                ? 'All'
                : configs?.uploadVideo
                ? 'Videos'
                : 'Photos'
            }
            enableGallery={configs?.uploadFromGallery}
          />
        </FormProvider>
      </VStack>
      {visibleDraftMenu && (
        <CustomActionSheet isVisible={visibleDraftMenu} onClose={onCloseDraft}>
          <TouchableOpacity onPress={onOpenDraftList}>
            <HStack space="2" alignItems="center" padding="5">
              <ExportIconSet />
              <Typography>Drafts</Typography>
            </HStack>
          </TouchableOpacity>
        </CustomActionSheet>
      )}
      {visibleDraftList && (
        <PostDraftModal
          isVisible={visibleDraftList}
          onClose={onCloseDraftList}
          postType="Post"
        />
      )}
    </>
  );
};

export default PreviewPost;

const styles = StyleSheet.create({
  menuIcon: {transform: [{rotate: '90deg'}]},
});
