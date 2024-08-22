import React from 'react';
import {
  HomeHeader,
  HomeSectionStory,
  SocialPostList,
  VStack,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {BackgroundContentUploaderUI} from './BackgroundContentUploader';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import LiveHome from './LiveHome';

const SocialHome = () => {
  const {} = useHeader({hidden: true});
  const {socialType, handleCheckElementExist, isReelsOnly} =
    useSocialTypesConfig();
  const isTextual = socialType === 'text';

  const isStoryOnly =
    !handleCheckElementExist('post') &&
    !handleCheckElementExist('live') &&
    !handleCheckElementExist('reels') &&
    !isTextual;

  const showPostList =
    handleCheckElementExist('post') ||
    handleCheckElementExist('reels') ||
    isTextual;

  return (
    <VStack flex="1">
      {!isReelsOnly && <HomeHeader />}
      {isStoryOnly ? (
        <VStack>
          <HomeSectionStory />
          <BackgroundContentUploaderUI />
        </VStack>
      ) : showPostList ? (
        <SocialPostList
          listHeader={
            isTextual
              ? () => <BackgroundContentUploaderUI />
              : () => (
                  <VStack>
                    <HomeSectionStory />
                    <BackgroundContentUploaderUI />
                  </VStack>
                )
          }
        />
      ) : (
        <VStack flex="1">
          <LiveHome />
        </VStack>
      )}
    </VStack>
  );
};

export default SocialHome;
