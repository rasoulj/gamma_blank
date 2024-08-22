import React, {memo, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {HorizontalProductsListProps} from './horizontal-products-list.props';
import styles from './styles';
import {getColor, Typography, useNavigate} from '~/components/elemental';
import EducationEducatorItem from '~/components/molecules/EducationEducatorItem';

const RenderItem = ({item, index, onItemPress}) => (
  <EducationEducatorItem
    item={item}
    onItemPress={onItemPress}
    style={index === 0 && {marginLeft: 20}}
  />
);

function HorizontalEducatorsList({
  title,
  style,
  data,
  onClickSeeAll,
}: HorizontalProductsListProps) {
  const listRef = useRef<FlatList>();

  const {navigateWithName} = useNavigate();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography
          variant="ButtonText"
          color={getColor({color: 'black'})}
          style={styles.title}>
          {title}
        </Typography>
        {data?.length > 10 && (
          <Typography
            onPress={onClickSeeAll}
            fontSize={'md'}
            fontWeight={'500'}
            color={getColor({color: 'secondary.500'})}>
            See all
          </Typography>
        )}
      </View>

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={item => item?.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            onItemPress={() =>
              navigateWithName('InstructorProfile', {id: item?.id})
            }
          />
        )}
      />
    </View>
  );
}
export default memo(HorizontalEducatorsList);
