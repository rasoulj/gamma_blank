import {FlatList, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Layer,
  RelativeLayout,
  Typography,
  deviceHeight,
  Share,
  getColor,
} from '~/components/elemental';
import {shareData} from '~/components/molecules/gallery/shareData';
const appConfig = require('../../../../../app.json');
import config from 'config';

const CourseShareModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const deepLink = `${config?.baseURL}/share?redirecturl=${String(
    appConfig?.name,
  ).toLocaleLowerCase()}://Product/detail/${item?.id}`;

    console.log({deepLink})

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <Layer behavior={'height'} style={styles.content}>
        <Typography
          fontWeight={'700'}
          fontSize="4.5"
          lineHeight={24}
          color={'gray.800'}
          alignSelf={'center'}
          mb={'6'}>
          Share
        </Typography>
        <FlatList
          data={shareData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <Layer style={styles.container}>
                <RelativeLayout style={styles.btnContainer}>
                  {item?.isNativeShare ? (
                    <Share
                      type={item?.type}
                      data={
                        item?.id
                          ? {
                              title: item?.title,
                              url: deepLink,
                              isNativeShare: item?.isNativeShare,
                            }
                          : item
                      }
                      data-id={''}
                      name={''}
                      style={undefined}
                      iconProps={undefined}
                      isNativeShare={false}
                      navigate={undefined}
                    />
                  ) : (
                    <Share
                      type={item?.type}
                      data={
                        item?.id
                          ? {
                              title: item?.title,
                              url: deepLink,
                              social: item?.social,
                            }
                          : item
                      }
                      data-id={''}
                      name={''}
                      style={undefined}
                      iconProps={undefined}
                      isNativeShare={false}
                      navigate={undefined}
                    />
                  )}
                </RelativeLayout>
                <Typography style={styles.title}>{item?.title}</Typography>
              </Layer>
            );
          }}
        />
      </Layer>
    </CustomActionSheet>
  );
};

export default memo(CourseShareModal);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    marginRight: 6,
    marginLeft: 6,
  },
  btnContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    marginLeft: 5,
  },
  content: {
    position: 'relative',
    height: deviceHeight / 5.5,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
});
