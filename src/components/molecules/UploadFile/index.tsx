import React, {memo, useEffect} from 'react';
import {useController} from 'react-hook-form';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import Video2icon from '~/assets/icons/Video2.icon';
import * as Elemental from '~/components/elemental';
import useUploadFilesStore from '~/stores/uploadFilesStore';
import {uploadFile} from '~/utils/fileUploader';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import {
  CloseIconSet,
  FileIcon,
  GalleryIconSet,
  VideoIconSet,
  getColor,
} from '../../elemental';

type UploadFileProps = {
  name?: any;
  control?: any;
  title?: string;
  icon?: string;
  type?: 'image' | 'video' | 'file' | 'all';
  multiple?: boolean;
};

const imageExtensionsRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

const UploadFile = ({
  name = '',
  control = '',
  title,
  type = 'all',
  multiple = false,
}: UploadFileProps) => {
  const {field} = useController({name, control});
  const {attachedFiles, setAttachedFiles} = useUploadFilesStore();

  const {navigateWithName} = Elemental.useNavigate();

  useEffect(() => {
    setAttachedFiles(field?.value ?? []);
  }, []);

  const FilePiker = () => {
    let DocumentType: any = types.allFiles;
    switch (type) {
      case 'file':
      case 'all':
        DocumentType = types.allFiles;
        break;
      case 'image':
        DocumentType = types.images;
        break;
      case 'video':
        DocumentType = types.video;
        break;
      default:
        DocumentType = types.allFiles;
    }

    DocumentPicker.pickSingle({
      mode: 'import',
      allowMultiSelection: false,
      type: DocumentType,
    })
      .then(data => {
        try {
          if (!multiple) {
            setAttachedFiles([
              {
                fileName: data?.name,
                portfolioType: data.type,
                url: '',
                size: data?.size,
                progress: 0,
              },
            ]);
          } else {
            setAttachedFiles([
              ...attachedFiles,
              {
                fileName: data?.name,
                portfolioType: data.type,
                url: '',
                size: data?.size,
                progress: 0,
              },
            ]);
          }
        } catch (err) {}

        uploadFile(
          {
            path: data.uri,
            filename: data?.name,
            mime: data?.type,
          },
          i => {
            if (!multiple) {
              setAttachedFiles([
                {
                  fileName: data?.name,
                  portfolioType: data.type,
                  url: '',
                  size: data?.size,
                  progress: i === 100 ? 99 : i,
                },
              ]);
            } else {
              setAttachedFiles([
                ...attachedFiles,
                {
                  fileName: data?.name,
                  portfolioType: data.type,
                  url: '',
                  size: data?.size,
                  progress: i === 100 ? 99 : i,
                },
              ]);
            }
          },
        )
          .then((fileName: any) => {
            if (!multiple) {
              field?.onChange(fileName.uploadedUrl);
              setAttachedFiles([
                {
                  fileName: data?.name,
                  portfolioType: data.type,
                  url: fileName?.uploadedUrl,
                  size: data?.size,
                  progress: 100,
                },
              ]);
            } else {
              const allFiles = [
                ...attachedFiles,
                {
                  fileName: data?.name,
                  portfolioType: data.type,
                  url: fileName?.uploadedUrl,
                  size: data?.size,
                  progress: 100,
                },
              ];
              field?.onChange(allFiles.map(item => item?.url ?? item));
              setAttachedFiles(allFiles);
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };
  if (!title) {
    switch (type) {
      case 'file':
      case 'all':
        title = 'Upload File';
        break;
      case 'image':
        title = 'Upload Photo';
        break;
      case 'video':
        title = 'Upload Video';
        break;
    }
  }

  const getIconComponent = () => {
    switch (type) {
      case 'file':
        return (
          <Elemental.PaperclipIconSet color={'primary.500'} style={styles.mr} />
        );
      case 'all':
        return (
          <Elemental.DocumentIconSet color={'primary.500'} style={styles.mr} />
        );
      case 'image':
        return (
          <Elemental.CameraIconSet color={'primary.500'} style={styles.mr} />
        );
      case 'video':
        return <VideoIconSet color={'primary.500'} style={styles.mr} />;
      default:
        return (
          <Elemental.PaperclipIconSet color={'primary.500'} style={styles.mr} />
        );
    }
  };

  return (
    <View style={styles.mt}>
      <Button style={styles.btn} onPress={() => FilePiker()}>
        <View style={styles.centerTextView}>
          {type && getIconComponent()}
          <Typography color={'primary.500'} style={styles.btnTitle}>
            {title}
          </Typography>
        </View>
      </Button>
      {attachedFiles &&
        attachedFiles?.map(item => {
          return (
            <View style={styles.itemContainer}>
              <Pressable
                style={[
                  styles.iconContainer,
                  {
                    opacity: item?.progress === 100 ? 1 : 0.5,
                  },
                ]}
                onPress={() => {
                  if (imageExtensionsRegex.test(item)) {
                    navigateWithName('fullscreen image', {
                      url: item,
                      isEditProfile: false,
                    });
                  }
                }}>
                {(item?.portfolioType?.includes('image') ||
                  imageExtensionsRegex.test(item)) && (
                  <GalleryIconSet color={getColor({color: 'primary.500'})} />
                )}
                {item?.portfolioType?.includes('video') && (
                  <Video2icon color={getColor({color: 'primary.500'})} />
                )}
                {item?.portfolioType?.includes('application') && (
                  <FileIcon color={getColor({color: 'primary.500'})} />
                )}
              </Pressable>
              <View style={styles.content}>
                <View style={styles.hStack}>
                  <View style={styles.titleView}>
                    <Typography numberOfLines={1}>
                      {item?.fileName
                        ? item?.fileName?.substring(0, 20) + '...'
                        : item?.substring(item?.lastIndexOf('/') + 1)}{' '}
                    </Typography>
                    {item?.size && (
                      <Typography numberOfLines={1}>
                        (
                        {item?.size > 1000000
                          ? Math.round(item?.size / 1000000) + ' mb'
                          : Math.round(item?.size / 1000) + ' kb'}
                        )
                      </Typography>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setAttachedFiles([
                        ...attachedFiles?.filter(
                          d => d.fileName !== item?.fileName,
                        ),
                      ])
                    }>
                    <CloseIconSet />
                  </TouchableOpacity>
                </View>
                <View style={styles.containerProgress}>
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${item?.progress}%`,
                      },
                    ]}
                  />
                </View>
                <View style={styles.rowView}>
                  <Typography color={'primary.300'} style={styles.font12}>
                    {item?.progress === 100
                      ? 'Uploaded'
                      : !!item?.progress
                      ? `${item?.progress}%`
                      : ''}
                  </Typography>
                  {item?.progress !== 100 && !!item?.progress && (
                    <Typography color={'primary.300'} style={styles.font12}>
                      {Math.round((Math.random() * 60) / 100)} sec remains
                    </Typography>
                  )}
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};
export default memo(UploadFile);

const styles = StyleSheet.create({
  font12: {fontSize: 12, fontWeight: '400'},

  rowView: {flexDirection: 'row', justifyContent: 'space-between'},

  progress: {
    height: 4,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
  },

  containerProgress: {
    width: '100%',
    height: 4,
    backgroundColor: getColor({color: 'primary.300'}),
    borderRadius: 100,
  },

  titleView: {flexDirection: 'row', width: '70%', marginBottom: 5},

  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  content: {flex: 1, marginHorizontal: 10},

  iconContainer: {
    width: 49,
    height: 49,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.300'}),
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  centerTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    backgroundColor: getColor({color: 'background.500'}),
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 2,
    marginBottom: 10,
  },

  mt: {marginTop: 16},

  btnTitle: {fontSize: 16, fontWeight: '600'},

  mr: {marginRight: 5},
});
