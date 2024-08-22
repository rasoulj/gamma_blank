import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  FlatList,
  Layer,
  Typography,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import useIterestStore from '~/stores/interestStore';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import InterestItem from './InterestItem';
import {useGetProductCategories, useUpdateUser} from './hook';
import useHeader from '~/components/elemental/hooks/use_header';

const Interests = () => {
  const setIsIntroVisited = useAuthStore(state => state?.setIsIntroVisited);
  const user = useAuthStore(state => state?.user);
  const {navigateWithName} = useNavigate();
  const {mutate, isLoading} = useUpdateUser();
  const {selectedCategorys} = useIterestStore();
  const setSelectedCategorys = useIterestStore(
    state => state?.setSelectedCategorys,
  );
  const setUser = useAuthStore(state => state?.setUser);

  const {params} = useRoute();

  const {data: categoryData}: any = useGetProductCategories({
    key: params?.entity ?? 'productCategories',
  });
  const categories = categoryData?.staticConfig_getStaticConfig?.result?.value
    ? JSON?.parse(categoryData?.staticConfig_getStaticConfig?.result?.value)
    : [];

  const userInterests = JSON.parse(user?.favoriteCategories ?? '[]') ?? [];

  useEffect(() => {
    setSelectedCategorys(userInterests);
  }, []);

  const renderItem = ({item}) => {
    return <InterestItem item={item} multiSelect={params?.multiSelect} />;
  };

  const headerComponent = () => {
    return (
      <>
        <Typography style={styles.title}>What you love</Typography>
        <Typography style={styles.desc}>
          Choose categories that interests you more.
        </Typography>
        <Typography style={styles.desc2} color="gray.500">
          Select at least 3 categories for now, You can change it later on
          profile settings.
        </Typography>
      </>
    );
  };

  const visitedIntero = () => {
    const userInput = {
      introSeen: true,
      favoriteCategories: JSON.stringify(selectedCategorys),
    };

    mutate(
      {userId: user?.id, userInput},
      {
        onSuccess(data: any) {
          if (data?.user_updateUser?.status?.code === 1) {
            if (isElementInModel('EducationHome')) {
              setUser(data?.user_updateUser?.result);
              if (params?.buttonTitle) {
                navigateWithName('Setting');
              } else {
                setIsIntroVisited(true);
              }
            } else {
              setSelectedCategorys(selectedCategorys);
              setIsIntroVisited(true);
              navigateWithName('home');
            }
          } else {
            navigateWithName('interest');
          }
        },
      },
    );
  };

  const {} = useHeader({
    hasBack: true,
    title: {
      children: params?.multiSelect ? 'Interests' : 'Categories',
      fontWeight: 'bold',
    },
  });

  return (
    <Layer style={styles.container}>
      <FlatList
        numColumns={3}
        keyExtractor={(_, index) => `key${index}`}
        contentContainerStyle={styles.contentContainer}
        data={categories}
        renderItem={renderItem}
        ListHeaderComponent={
          params?.multiSelect && (params?.entity || params?.isFirst)
            ? headerComponent
            : () => {}
        }
      />

      {params?.multiSelect && (params?.entity || params?.isFirst) && (
        <Button
          style={styles.mb}
          isLoading={isLoading}
          onPress={() => visitedIntero()}
          disabled={selectedCategorys?.length < 3}
          bgColor={
            selectedCategorys?.length < 3 ? 'primary.200' : 'primary.500'
          }>
          {params?.buttonTitle ? params?.buttonTitle : 'Continue'}
        </Button>
      )}
    </Layer>
  );
};

export default Interests;

const styles = StyleSheet.create({
  mb: {marginBottom: 8},
  container: {flex: 1},

  desc: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 24,
  },

  desc2: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    marginBottom: 24,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 8,
  },

  contentContainer: {flexGrow: 1},
});
