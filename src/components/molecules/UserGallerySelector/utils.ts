import {PermissionsAndroid, Platform} from 'react-native';

export default async function hasAndroidPermission() {
  const getCheckPermissionPromise = async () => {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasMediaImagePermission = await PermissionsAndroid.check(permission);
    const hasMediaVideoPermission =
      Platform.Version >= 33
        ? await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          )
        : true;
    console.log(
      'Platform version',
      Platform.Version,
      {hasMediaImagePermission},
      {hasMediaVideoPermission},
    );
    if (hasMediaImagePermission && hasMediaVideoPermission) {
      return true;
    }

    const statusImage = await PermissionsAndroid.request(permission);
    const statusVideo =
      Platform.Version >= 33
        ? await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          )
        : 'granted';
    console.log({statusVideo}, {statusImage});
    return statusImage === 'granted' && statusVideo === 'granted';
  };

  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getCheckPermissionPromise();
}
