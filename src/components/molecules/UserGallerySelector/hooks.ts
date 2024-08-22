import {
  AssetType,
  CameraRoll,
  useCameraRoll,
} from '@react-native-camera-roll/camera-roll';
import {useEffect, useState} from 'react';
import hasAndroidPermission from './utils';
import {Platform} from 'react-native';
export const useGallery = ({
  assetType = 'All',
  pageSize = 30,
  groupName,
}: {
  assetType?: AssetType;
  pageSize?: number;
  groupName?: any;
}) => {
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, getPhotos] = useCameraRoll();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (photos?.edges?.length > 0) {
      let tempPhoto = [...loadedPhotos, ...photos?.edges];
      setLoadedPhotos(tempPhoto);
    }
  }, [photos]);
  const getPhotoFromGallery = async (end_cursor?: any) => {
    await getPhotos({
      assetType,
      after: end_cursor,
      first: pageSize,
      groupName: groupName === 'Gallery' ? undefined : groupName,
    });
    setIsLoading(false);
  };
  const getAlbums = async () => {
    const albums = await CameraRoll.getAlbums({assetType: 'All'});
    console.log(JSON.stringify({albums}));
    setAlbums(albums);
  };
  const [hasPermmission, setHasPermission] = useState(
    Platform.OS === 'ios' ? true : false,
  );
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let response = Platform.OS === 'ios';
      if (Platform.OS === 'android') response = await hasAndroidPermission();
      setHasPermission(response);
      if (response) {
        getAlbums();
        getPhotoFromGallery();
      }
    })();
  }, []);
  useEffect(() => {
    if (groupName && hasPermmission) {
      setLoadedPhotos([]);
      getPhotoFromGallery();
    }
  }, [groupName, hasPermmission]);
  const onFetchNextPage = () => {
    getPhotoFromGallery(photos?.page_info?.end_cursor);
  };
  return {
    photos: loadedPhotos ?? [],
    hasNextPage: photos?.page_info?.has_next_page,
    onFetchNextPage,
    albums: albums ?? [],
    isLoading,
  };
};
