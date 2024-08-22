import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import {getColor} from '../../elemental/helper';
import Layer from '../../atoms/Layer';
import Typography from '../../atoms/Typography';

import {Location3Icon, TrashIcon} from '~/assets';
import {useRemoveFavoriteEvent} from './hook';
import {useQueryClient} from 'react-query';
import Image from '../../atoms/Image';
import UndrawImg from './undraw_image.svg';

const FavoriteItem = ({item}: any) => {
  const queryClient = useQueryClient();
  const {mutate} = useRemoveFavoriteEvent();
  const remover = () => {
    const input = {
      eventId: item?.eventId,
    };
    mutate(input, {
      onSuccess(data) {
        if (data?.eventAndTicketing_removeFavoriteEvent?.value === 'Success') {
          queryClient.invalidateQueries(['getFavoriteEvents'], {
            exact: false,
          });
        }
      },
    });
  };

  return (
    <HStack
      px="2"
      py="2"
      pr="4"
      bg={getColor({color: 'background.400'})}
      borderWidth={0}
      shadow="4"
      space="3"
      borderRadius="xl"
      mx={1}
      marginY={'4px'}
      alignItems={'center'}>
      {item?.event?.imageUrl ? (
        <Image
          source={{
            uri: item?.event?.imageUrl,
            // uri: "https://apsygammastorage.blob.core.windows.net/images/5rt1UDGCEw.jpg",
          }}
          resizeMethod="auto"
          style={{
            backgroundColor: '#EBEBEB',
            borderRadius: 11,
            borderColor: '#0001',
            borderWidth: 1,
            width: 100,
            height: 100,
          }}
        />
      ) : (
        <Layer
          style={{
            backgroundColor: '#EBEBEB',
            borderRadius: 11,
            borderColor: '#0001',
            borderWidth: 1,
          }}>
          <UndrawImg width={90} style={{margin: 5, marginTop: 10}} />
        </Layer>
      )}
      <Layer
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: '400',
            textTransform: 'capitalize',
            marginTop: 5,
          }}>
          {item?.event?.title}
        </Typography>
        <Typography
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#9A9A9A',
            marginTop: 5,
          }}>
          {item?.event?.owner?.fullName}
        </Typography>
        <Typography
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#9A9A9A',
            // marginTop: 4,
          }}>
          {new Date(item?.event?.date).toLocaleDateString('en-US', {
            // timeZone: 'UTC',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          / {item?.event?.startTime}-{item?.event?.endTime}
        </Typography>
        <Layer
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Location3Icon
            style={{ marginRight: -8}}
            width={34}
            height={34}
            color={getColor({color: 'secondary.400'})}
          />
          <Typography
            style={{
              width: '60%',
              fontSize: 14,
              fontWeight: '500',
              lineHeight: 16,
              color: getColor({color: 'secondary.400'}),
            }}
            numberOfLines={1}>
            {item?.event?.city}
          </Typography>
          <TouchableOpacity style={{flex: 1}} onPress={() => remover()}>
            <TrashIcon
              style={{alignSelf: 'flex-end'}}
              width={30}
              height={30}
              color={getColor({color: 'primary.400'})}
            />
          </TouchableOpacity>
        </Layer>
      </Layer>
    </HStack>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({});
