import {Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import RNFetchBlob from 'react-native-blob-util';

export const uploadFile = async (param: any, onUploadProgress:(percent) => void) => {
  const uri = param?.path;
  const mime: string = param?.mime;
  const extention = param?.path?.split?.('.')?.pop?.() || '';
  // const name: string = param?.filename ?? `image${Date.now()}${param?.path}`;
  const name: string = param?.filename ?? `image${Date.now()}.${extention}`;

  return new Promise(async (resolve, reject) => {
    try {
      const sasContainerUri =
        'https://apsybiblomodelstorage.blob.core.windows.net';
      const customBlobName = Math.random().toString(16).slice(2);
      const container = 'images';
      const sasToken =
        'sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2032-12-12T15:34:07Z&st=2022-12-12T07:34:07Z&spr=https&sig=B%2BNnDt35GweG8Ts0XbWhv8lamEkn4HF9wnRfFcIwRro%3D'; // you may need to play with other html verbs in this string e.g., `sp`, `ss` e.t.c.
      const assetPath = `${sasContainerUri}/${container}/${customBlobName}${name}`;

      const localUri = uri
      console.log(uri);
      
        // Platform.OS === 'ios' ? uri.replace('file://', '/') : uri;
      const res = await RNFetchBlob.fetch(
        'PUT',
        `${assetPath}?${sasToken}`,
        {
          'x-ms-blob-type': 'BlockBlob',
          'content-type': 'application/octet-stream',
          'x-ms-blob-content-type': mime || 'image/png',
        },
        RNFetchBlob.wrap(localUri),
      )
        .uploadProgress({interval: 250}, (written, total) => {
          console.log('uploaded', written / total);
          onUploadProgress?.(Math.round(written / total * 100))
        })
        .progress({count: 10}, (received, total) => {
          console.log('progress', received / total);
        });
      if (res.respInfo.status === 201) {
        resolve({
          ...res,
          uploadedUrl: res?.respInfo?.redirects?.[0]?.replace?.(
            '?' + sasToken,
            '',
          ),
        });
      }
    } catch (error) {
      console.log(error, 'error');
      showMessage({
        message: JSON.stringify(error),
        type: 'danger',
        icon: 'danger',
      });
      reject(error);
    }
  });
};
