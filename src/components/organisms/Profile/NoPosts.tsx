import {VStack} from 'native-base';
import React from 'react';
import {WithLocalSvg} from 'react-native-svg';
import {EmptyContent} from '~/assets';
import {Typography, useNavigate} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';

const NoPosts = ({
  title = 'post',
  userId,
}: {
  title?: string;
  userId: number;
}) => {
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state.user);
  const {socialType} = useSocialTypesConfig();

  const onNewPostPress = () => {
    if (title === 'post')
      navigateWithName(socialType === 'text' ? 'createPost' : 'PreviewPost');
    else {
      navigateWithName('AddStory', {type: 'Reels'});
    }
  };

  return (
    <VStack marginTop="6" alignItems="center">
      {userId != user?.id ? (
        <Typography fontWeight="600" fontSize="md">
          It does not have a captured moment yet.
        </Typography>
      ) : (
        <>
          <Typography fontWeight="600" fontSize="md">
            You do not have a captured moment yet.
          </Typography>
          <Typography
            color="info.500"
            fontWeight="500"
            fontSize="sm"
            marginTop="2"
            marginBottom="14"
            onPress={onNewPostPress}>
            Make your first {title} now
          </Typography>
          <WithLocalSvg asset={EmptyContent} />
        </>
      )}
    </VStack>
  );
};
export default NoPosts;
