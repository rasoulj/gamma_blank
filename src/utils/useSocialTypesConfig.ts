import {model} from '~/data/model';

const useSocialTypesConfig = () => {
  const configs = model.metaData?.configs;
  const socialType = configs?.selectSocialType?.type;
  const socialTypeConfigs = configs?.social;

  const types = {
    post: [
      socialTypeConfigs?.post,
      socialTypeConfigs?.story,
      socialTypeConfigs?.highlight,
      socialTypeConfigs?.live,
      socialTypeConfigs?.reels,
    ],
    liveStory: [socialTypeConfigs?.story, socialTypeConfigs?.live],
    reelsStory: [socialTypeConfigs?.story, socialTypeConfigs?.reels],
    reelsLiveStory: [
      socialTypeConfigs?.story,
      socialTypeConfigs?.live,
      socialTypeConfigs?.reels,
    ],
    story: [socialTypeConfigs?.story],
    reels: [socialTypeConfigs?.reels],
    live: [socialTypeConfigs?.live],
    highlight: [socialTypeConfigs?.highlight],
  };

  function handleCheckTypeActivation(type: keyof typeof types): boolean {
    return types[type].every(t => t === true);
  }

  function handleCheckElementExist(type: keyof typeof types): boolean {
    return socialTypeConfigs?.[type];
  }

  const isReelsOnly =
    !socialTypeConfigs?.post &&
    !socialTypeConfigs?.story &&
    !socialTypeConfigs?.live &&
    socialTypeConfigs?.reels;

  const isStoryOnly =
    !socialTypeConfigs?.post &&
    socialTypeConfigs?.story &&
    !socialTypeConfigs?.live &&
    !socialTypeConfigs?.reels;

  return {
    socialType,
    types,
    handleCheckTypeActivation,
    handleCheckElementExist,
    isReelsOnly,
    isStoryOnly,
  };
};

export default useSocialTypesConfig;
