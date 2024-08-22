import React, {useState} from 'react';
import UserAvatar from '~/components/molecules/UserAvatar';
import {HStack} from 'native-base';
import {CustomCheckBox} from '~/components';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useHideStoryMutation, useUnHideStoryMutation} from './hooks';
import {useQueryClient} from 'react-query';
import {scale} from '~/components/elemental';

const HideStoryItem = ({checkedItems, item, index}) => {
  const [isChecked, setIsChecked] = useState(item?.hideStory);
  const queryClient = useQueryClient();

  const {mutate: hideMutate, isLoading: hideLoading} = useHideStoryMutation();
  const onHideStory = () => {
    hideMutate(
      {followerId: item?.follower?.id},
      {
        onSuccess: data => {
          if (data?.social_hideStory?.code === 1) {
            setIsChecked(true);
            let tempItem = [...checkedItems.current];
            tempItem.push(item?.follower?.id);
            checkedItems.current = tempItem;
            queryClient.invalidateQueries(['user_getUsers'], {exact: false});
          }
        },
      },
    );
  };
  const {mutate: unhideMutate, isLoading: unhideLoading} =
    useUnHideStoryMutation();
  const onUnHideStory = () => {
    unhideMutate(
      {followerId: item?.follower?.id},
      {
        onSuccess: data => {
          if (data?.social_unhideStory?.code === 1) {
            setIsChecked(false);
            let tempItem = [...checkedItems.current];
            tempItem.splice(index, 1);
            checkedItems.current = tempItem;
            queryClient.invalidateQueries(['user_getUsers'], {exact: false});
          }
        },
      },
    );
  };

  const onToggle = () => {
    if (isChecked) {
      onUnHideStory();
    } else {
      onHideStory();
    }
  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <UserAvatar
        user={item?.follower}
        hasShadow={false}
        extraData={item?.follower?.username}
        avatarSize={scale(54)}
        fullNameFontSize="md"
        extraDataFontSize="sm"
      />
      {hideLoading || unhideLoading ? (
        <ActivityIndicator />
      ) : (
        <CustomCheckBox
          label={undefined}
          isChecked={isChecked}
          onToggle={onToggle}
          checkBoxStyle={styles.checkBoxStyle}
        />
      )}
    </HStack>
  );
};

export default HideStoryItem;

const styles = StyleSheet.create({
  checkBoxStyle: {borderRadius: 5, height: 24, width: 24},
});
