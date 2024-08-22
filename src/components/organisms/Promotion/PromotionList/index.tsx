import React, {useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import NoResultPromotionsIcon from '~/assets/icons/CustomIcons/NoResultPromotions.icon';
import {
  AddIconSet,
  Layer,
  Typography,
  useNavigate,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import {useGetPromotion} from '../hook';
import PromotionListItem from './PromotionListItem';

const PromotionList = () => {
  const {navigateWithName} = useNavigate();
  const userId = useAuthStore(state => state?.user?.id);
  const icons = useMemo(() => {
    return (
      <TouchableOpacity onPress={() => navigateWithName('Create promotion')}>
        <AddIconSet />
      </TouchableOpacity>
    );
  }, []);
  const {} = useHeader({
    hasTitle: true,
    hasBack: true,
    title: {children: 'Promotions', fontSize: 'md', fontWeight: 'bold'},
    icons,
  });

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetPromotion({
      where: {
        userId: {
          eq: userId,
        },
        promotionProducts: {
          some: {
            id: {
              gte: 1,
            },
          },
        },
      },
    });


  const emptyComponent = () => {
    return (
      !isLoading && (
        <Layer style={styles.noHistoryContainer}>
          <NoResultPromotionsIcon />
          <Typography color={'gray.300'} style={styles.noHistoryText}>
            No promotions yet!
          </Typography>
        </Layer>
      )
    );
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.touchableItems}
        onPress={() =>
          navigateWithName('product list', {
            promotionId: item?.id,
            item,
            promotion: item,
          })
        }>
        <PromotionListItem item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.pages}
        contentContainerStyle={{}}
        keyExtractor={(item, index) => item?.id}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={2}
        ListEmptyComponent={emptyComponent}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        renderItem={renderItem}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </>
  );
};

export default PromotionList;

const styles = StyleSheet.create({
  noHistoryContainer: {
    flexGrow: 1,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHistoryText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
  },
  touchableItems: {width: '100%'},
  footer: {height: 100},
});
