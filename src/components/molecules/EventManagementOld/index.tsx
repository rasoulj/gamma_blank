import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  Card,
  ArrowBackIcon,
  Typography,
  PlusIcon,
  FlatList,
  ActionSheet,
  HStack,
  Button,
} from '~/components/elemental';
import RenderItem from './RenderItem';
import {useGetEvents} from './hooks';
import useService from './useService';

interface IProps {
  title?: string;
  data: any;
  navigation?: NativeStackNavigationProp<any>;
  onPressActivate?: (id) => void;
  onPressDelete?: (id) => void;
  navigateTo?: () => void;
}

export default function EventManagement({
  title = 'Event management',
  navigation,
  onPressActivate,
  onPressDelete,
  navigateTo,
}: IProps) {
  const {
    data,
    isLoading,
    fetchNextPage,
    error,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetEvents({
    order: {
      event: {createdDate: 'DESC'},
    },
  });
  const {showModal, setShowModal, onDelete, onActive, deleteId, setDeleteId} =
    useService();
  const events = data?.pages || [];

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <React.Fragment>
      <FlatList
        data={events}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderItem
            onPressActivate={onActive}
            onPressDelete={() => {
              setDeleteId(item?.event?.id);
              setShowModal(true);
            }}
            item={item}
            index={index}
          />
        )}
        mt={4}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          onLoadMore?.();
        }}
      />
      <ActionSheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <ActionSheet.Content>
          <Typography>Confirmation</Typography>
          <Typography
            style={{
              marginTop: 16,
              marginBottom: 32,
            }}>
            Are you sure you want to delete the event ?{' '}
          </Typography>
          <HStack
            space={4}
            justifyContent={'space-between'}
            alignItems={'center'}
            style={{
              width: '100%',
            }}>
            <Button
              onPress={() => setShowModal(false)}
              variant={'outline'}
              style={{flex: 1}}>
              Cancel
            </Button>
            <Button
              style={{flex: 1}}
              colorScheme={'red'}
              backgroundColor={'red.600'}
              onPress={() => onDelete(deleteId)}>
              Delete
            </Button>
          </HStack>
        </ActionSheet.Content>
      </ActionSheet>
    </React.Fragment>
  );
}
