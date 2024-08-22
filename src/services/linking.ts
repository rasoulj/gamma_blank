import config from 'config';

const pathConfig = {
  screens: {
    Main: {
      screens: {
        PostDetailScreen: {
          path: 'postDetail',
        },
        ProfileScreen: {
          path: 'profile',
        },
        LiveScreen: {
          path: 'liveUser',
        },
        StoriesScreen: {
          path: 'storyDetails',
        },
        PreviewHighlightScreen: {
          path: 'highlights',
        },
        EducationHomeScreen: {
          path: 'instructorPolicyPay',
        },
      },
    },
  },
};

export const linking = {
  prefixes: ['asociar://asociar'],
  config: pathConfig,
};
