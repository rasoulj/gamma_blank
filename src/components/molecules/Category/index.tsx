import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../atoms/Screen';
import CategoryTypeOne from './CategoryTypeOne';
import CategoryTypeTwo from './CategoryTypeTwo';
import {
  Button,
  Typography,
  VStack,
  getColor,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import {
  useCreateInterest,
  useGetInterest,
} from '~/components/organisms/Matching/hooks';
import useAuthStore from '~/stores/authStore';
import {useQueryClient} from 'react-query';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import {useUpdateUser} from '../SelectRole/hook';

const Category = ({
  category,
  entity,
  isFirst,
}: {
  category: 'image' | 'icon';
  entity: string;
  isFirst?: boolean;
}) => {
  const {navigateWithName, navigation} = useNavigate();

  const {params} = useRoute();
  const queryClinet = useQueryClient();

  const setIsIntroVisited = useAuthStore(state => state?.setIsIntroVisited);
  const user = useAuthStore(state => state?.user);
  const setUser = useAuthStore(state => state?.setUser);

  const {interests: allInterests, isLoading: isLoadingIntrest} = useGetInterest(
    {
      enabled: !!params?.buttonTitle && !isElementInModel('EducationHome'),
      userId: user?.id,
    },
  );
  const userInterests =
    JSON.parse(user?.favoriteCategories ?? '[]') ??
    allInterests?.map(item => item?.text) ??
    [];

  const {mutate, isLoading} = useCreateInterest();
  const {mutate: userMutate, isLoading: userLoading} = useUpdateUser();

  const [intrestItems, setIntrestItems] = useState([]);

  const onSaveInterest = () => {
    if (isElementInModel('EducationHome')) {
      const userInput = {
        ...user,
        favoriteCategories: JSON.stringify(intrestItems),
      };
      delete userInput?.id;
      userMutate(
        {userId: user?.id, userInput},
        {
          onSuccess(data) {
            setUser(data?.user_updateUser?.result);
            if (params?.buttonTitle) {
              navigateWithName('Setting');
            } else {
              setIsIntroVisited(true);
            }
          },
        },
      );
    } else {
      mutate(
        {interests: intrestItems},
        {
          onSuccess() {
            setIsIntroVisited(true);
            queryClinet.invalidateQueries(['match_get_users_interest']);
            if (params?.buttonTitle) {
              navigateWithName('Setting');
            }
          },
        },
      );
    }
  };

  return (
    <Screen>
      {isFirst && (
        <VStack style={params?.buttonTitle ? {} : styles.mt}>
          <Typography style={styles.title}>What you love</Typography>
          <Typography style={styles.desc}>
            Choose categories that interests you more.
          </Typography>
          <Typography style={styles.desc2} color="gray.500">
            Select at least 3 categories for now, You can change it later on
            profile settings.
          </Typography>
        </VStack>
      )}
      {category === 'image' ? (
        <CategoryTypeOne entity={entity} multiSelect={isFirst} />
      ) : (
        <CategoryTypeTwo
          entity={entity}
          multiSelect={isFirst}
          setIntrestItems={setIntrestItems}
          intrestItems={userInterests}
        />
      )}
      {isFirst && (
        <Button
          isLoading={isLoading || isLoadingIntrest || userLoading}
          onPress={() => onSaveInterest()}
          disabled={intrestItems?.length < 3}
          bgColor={intrestItems?.length < 3 ? 'primary.200' : 'primary.500'}>
          {params?.buttonTitle ? params?.buttonTitle : 'Continue'}
        </Button>
      )}
    </Screen>
  );
};

export default Category;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '700',
    color: getColor({color: 'gray.800'}),
  },

  desc: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    marginVertical: 8,
    color: getColor({color: 'gray.800'}),
  },

  desc2: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    marginBottom: 24,
  },

  mt: {marginTop: 40},
});
