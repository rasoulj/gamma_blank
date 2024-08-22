import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Divider, LoadIndicator} from '~/components/elemental';
import ScheduleItem from './ScheduleItem';
import ScheduleEmtpyState from './ScheduleEmtpyState';
import {useGetMatchTimes} from '../hooks';
import {appFormatDate} from '~/utils/helper';

const ScheduleList = ({
  Header,
  userId,
  selectable = false,
  onItemSelect,
  allowEmpty = true,
  setHasNoData,
  hasItemMenu = false,
}: {
  Header?: any;
  userId: number;
  selectable?: boolean;
  onItemSelect?: (item, timeIndex) => void;
  allowEmpty?: boolean;
  setHasNoData?: (value: boolean) => void;
  hasItemMenu?: boolean;
}) => {
  const date = useMemo(() => {
    return appFormatDate(new Date(), 'YYYY-MM-DD');
  }, [userId]);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = useGetMatchTimes({
    userId: userId,
    enabled: userId > 0,
    order: [{createdDate: 'DESC'}],
    where: {date: {gte: date}},
  });

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  const [selectedItemIndex, setSelectedItemIndex] = useState(undefined);
  const [newSelect, setNewSelect] = useState(false);
  const timeIndexRef = useRef(-1);
  const onItemPress = onItemSelect
    ? (index, item, timeIndex) => {
        onItemSelect?.(item, timeIndex);
        timeIndexRef.current = timeIndex;
        setSelectedItemIndex(index);
        setNewSelect(prev => !prev);
      }
    : undefined;

  const renderItem = useCallback(
    ({item, index}) => (
      <ScheduleItem
        {...{
          item,
          index,
          selectable,
          onItemPress,
          selectedItem:
            selectedItemIndex === index ? timeIndexRef?.current : undefined,
          hasItemMenu,
        }}
      />
    ),
    [newSelect, hasItemMenu],
  );

  const ItemSeparatorComponent = useCallback(
    () => <Divider marginBottom={6} />,
    [],
  );

  const isEmpty = !isLoading && (!data || data?.pages?.length == 0);

  useEffect(() => {
    setHasNoData?.(isEmpty);
  }, [isEmpty]);

  return (
    <>
      {isLoading && !data && <LoadIndicator />}
      <FlatList
        data={data?.pages}
        renderItem={renderItem}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={refetch}
        refreshing={false}
        onEndReached={onEndReached}
        setEmptyComponent
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        ListEmptyComponent={
          isEmpty && allowEmpty ? <ScheduleEmtpyState /> : undefined
        }
      />
    </>
  );
};
export default ScheduleList;
