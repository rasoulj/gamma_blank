import React, {useCallback, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {HorizontalProductsListProps} from './horizontal-products-list.props';
import styles from './styles';
import {
  Button,
  getColor,
  Typography,
  useNavigate,
} from '~/components/elemental';

export default function HorizontalCategoryList({
  title,
  style,
  data,
  loading,
  onClickSeeAll,
}: HorizontalProductsListProps) {
  const listRef = useRef<FlatList>();

  const {navigateWithName} = useNavigate();

  const renderItem = useCallback(
    ({item, index}) => (
      <Button
        p="4"
        ml={index === 0 ? '4' : 0}
        mr="2"
        bg={getColor({color: 'primary.200'})}
        color={getColor({color: 'gray.800'})}
        _text={styles.text}
        onPress={() =>
          navigateWithName('CourseList', {data: item, hasHeader: true})
        }>
        {item?.name ?? item}
      </Button>
    ),
    [loading],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography
          variant="ButtonText"
          color={getColor({color: 'black'})}
          style={styles.title}>
          {title}
        </Typography>
        <Typography
          onPress={onClickSeeAll}
          fontSize={'md'}
          fontWeight={'500'}
          color={getColor({color: 'secondary.500'})}>
          See all
        </Typography>
      </View>

      <FlatList
        ref={listRef}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
}
