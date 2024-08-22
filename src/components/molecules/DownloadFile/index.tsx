import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FileIcon,
  GalleryIconSet,
  SwipeList,
  Typography,
  getColor,
} from '~/components/elemental';
import Video2icon from '~/assets/icons/Video2.icon';
import {TouchableOpacity} from 'react-native';
import {types} from 'react-native-document-picker';
import SwipeMedia from '../SwipeMedia';

const DownloadFile = ({files}) => {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState([]);
  useEffect(() => {
    setMedia([]);
    setFile([]);
    let mediaList = [];
    let fileList = [];

    for (let i = 0; i < files?.length; i++) {
      if (
        files[i].portfolioType.includes('image') ||
        files[i].portfolioType.includes('video')
      ) {
        mediaList?.push(files?.[i]);
        setMedia(mediaList);
      } else {
        fileList.push(files?.[i]);
        setFile(fileList);
      }
    }
  }, []);
  console.log(media);

  return (
    <View>
      <SwipeMedia data={media} />
      {file?.map(item => {
        return (
          <TouchableOpacity
            onPress={() => Linking.openURL(item?.url)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View
              style={{
                width: 49,
                height: 49,
                borderWidth: 2,
                borderColor: getColor({color: 'primary.500'}),
                borderRadius: 10,
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
              }}>
              {item?.portfolioType?.includes('image') && <GalleryIconSet />}
              {item?.portfolioType?.includes('video') && <Video2icon />}
              {item?.portfolioType?.includes('application') && (
                <FileIcon color={getColor({color: 'primary.500'})} />
              )}
            </View>
            <View style={{flex: 1, marginHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', width: '70%', marginBottom: 5}}>
                  <Typography style={{}} numberOfLines={1}>
                    {item?.fileName}{' '}
                  </Typography>
                  <Typography style={{width: '100%'}} numberOfLines={1}>
                    (
                    {item?.size > 1000000
                      ? Math.round(item?.size / 1000000) + ' mb'
                      : Math.round(item?.size / 1000) + ' kb'}
                    )
                  </Typography>
                </View>
                {/* <TouchableOpacity
                  onPress={() =>
                    setAttachedFiles([
                      ...attachedFiles?.filter(
                        d => d.fileName !== item?.fileName,
                      ),
                    ])
                  }>
                  <CloseIconSet />
                </TouchableOpacity> */}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DownloadFile;

const styles = StyleSheet.create({});
