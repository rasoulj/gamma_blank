import {VStack} from 'native-base';
import React from 'react';
import UserStoryList from './UserStoryList';
import {useNavigate} from '~/components';
import useAuthStore from '~/stores/authStore';

const MyStories = () => {
  const user = useAuthStore(state => state.user);
  const {navigation} = useNavigate();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <VStack flex="1">
      <UserStoryList
        item={{user, storyOwner: user}}
        itemIndex={0}
        seenIndex={0}
        storyIndex={0}
        goToNextUserStory={goBack}
        goToPreviewsUserStory={goBack}
        onSeenStory={() => {}}
      />
    </VStack>
  );
};

export default MyStories;
