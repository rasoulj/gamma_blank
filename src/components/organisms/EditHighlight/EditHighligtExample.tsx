import React from 'react';
import {useGetHighlights} from './hooks';
import useAuthStore from '~/stores/authStore';
import {Button, VStack, useNavigate} from '~/components';
const EditHighlightExample = () => {
  const user = useAuthStore(state => state.user);
  const {data, isLoading} = useGetHighlights({
    userId: user?.id,
    order: [{highlight: {createdDate: 'DESC'}}],
  });
  const {navigateWithName} = useNavigate();
  const onPress = () => {
    navigateWithName('EditHighlight', {item: data?.pages?.[0]});
  };
  return (
    <VStack p="80px">
      <Button onPress={onPress} isLoading={isLoading}>
        navigate to edit
      </Button>
    </VStack>
  );
};
export default EditHighlightExample;
