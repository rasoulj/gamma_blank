import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import Layer from '../../../atoms/Layer';
import {
  HeartIcon,
  IMG,
  Image,
  ThreeDotsIcon,
  Typography,
  User2Icon,
  deviceHeight,
  getColor,
  isDark,
  useNavigate,
} from '../../../elemental';
import {useAddToFavorite, useRemoveFavorite} from '../hook';
import ContentItemModal from './Modals/ContentItemModal';

const schema = yup.object().shape({
  report: yup.string().required(),
});

const configs = model?.metaData?.configs?.postlist || {
  like: true,
  comments: true,
  share: true,
  profile: true,
  social: true,
};

const ContentListItem = ({
  item,
  navigateWithName,
}: {
  item: any;
  navigateWithName?: any;
}) => {
  const queryClient = useQueryClient();
  const {navigateWithName: Navigate} = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLiked, setIsLiked] = useState(item?.isFavorite || false);

  const {user} = useAuthStore();

  const isMine = item?.product?.userId === user?.id;

  useEffect(() => {
    setIsLiked(item?.isFavorite);
  }, [item]);
  const [desLength, setDesLength] = useState(140);

  const {mutate: mutateAddToFavorite} = useAddToFavorite();
  const {mutate: mutateRemoveFavorite} = useRemoveFavorite();

  const AddToFavorite = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      mutateRemoveFavorite(
        {productId: item?.product?.id},
        {
          onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['getContentProducts']);
            queryClient.invalidateQueries(['getFavoriteProducts']);
            if (data) {
              setIsLiked(false);
            }
          },
        },
      );
    } else {
      const input = {
        productId: item?.product?.id,
      };
      mutateAddToFavorite(input, {
        onSettled(data: any, error, variables, context) {
          if (
            data?.ecommerceFavorite_createFavorite?.status?.value === 'Success'
          ) {
            setIsLiked(true);
            queryClient.invalidateQueries(['getContentProducts']);
            queryClient.invalidateQueries(['getFavoriteProducts']);
          }
        },
      });
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          navigateWithName
            ? navigateWithName('content Detail', {item: item?.product})
            : Navigate('content Detail', {item: item?.product})
        }>
        <Layer
          style={{
            borderRadius: 15,
            marginVertical: 8,
            marginHorizontal: 3,
            padding: 16,
            backgroundColor: isDark()
              ? getColor({color: 'background.400'})
              : getColor({color: 'background.500'}),
            shadowColor: '#555',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Layer
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {configs?.profile && (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigateWithName('profile', {item: item?.product?.user})
                  }>
                  {item?.product?.user?.photoUrl ? (
                    <IMG
                      src={item?.product?.user?.photoUrl}
                      style={{width: 38, height: 38, borderRadius: 50}}
                    />
                  ) : (
                    <User2Icon width={38} height={38} />
                  )}
                </TouchableOpacity>
                <Layer style={{marginLeft: 8, flex: 1}}>
                  <Typography style={{fontSize: 14, fontWeight: '500'}}>
                    {item?.product?.user?.fullName}
                  </Typography>
                </Layer>
              </>
            )}
            {isMine ? (
              <Pressable onPress={() => setIsModalVisible(true)}>
                <ThreeDotsIcon
                  style={{transform: [{rotate: '90deg'}], marginHorizontal: 5}}
                />
              </Pressable>
            ) : (
              <TouchableOpacity
                onPress={() => AddToFavorite()}
                style={{
                  padding: 8,
                  borderRadius: 100,
                  backgroundColor: getColor({
                    color: isLiked ? 'primary.500' : 'background.500',
                  }),
                }}>
                <HeartIcon
                  isLiked={isLiked}
                  onPress={() => AddToFavorite()}
                  style={{width: 20, height: 20}}
                  color="gray.50"
                  borderColor="primary.500"
                />
              </TouchableOpacity>
            )}
          </Layer>

          {item?.product?.productImages?.[0] && (
            <Image
              src={item?.product?.productImages?.[0]?.imageUrl}
              style={{
                width: '100%',
                height: deviceHeight * 0.2,
                borderRadius: 5,
                marginVertical: 8,
              }}
              resizeMode="cover"
            />
          )}

          <Layer style={{paddingVertical: 16}}>
            <Typography
              style={{fontSize: 18, fontWeight: '700', lineHeight: 24}}>
              {item?.product?.title}
            </Typography>
            <Typography
              color={'gray.500'}
              style={{fontSize: 12, fontWeight: '500'}}>
              {item?.product?.category}
            </Typography>
            <Typography style={{fontSize: 14, fontWeight: '400'}}>
              {item?.product?.description?.length > desLength
                ? (item?.product?.description).substring(0, desLength - 3) +
                  '...'
                : item?.product?.description}
            </Typography>
            {item?.product?.description?.length > desLength && (
              <TouchableOpacity onPress={() => setDesLength(2000)}>
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                  color="gray.400">
                  See more
                </Typography>
              </TouchableOpacity>
            )}
          </Layer>
        </Layer>
      </TouchableWithoutFeedback>
      <ContentItemModal
        item={item?.product}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default ContentListItem;

const styles = StyleSheet.create({});
