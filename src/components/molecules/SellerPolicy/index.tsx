import config from 'config';
import React from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import SellerPolicyIcon from '~/assets/icons/CustomIcons/SellerPolicy.icon';
import {
  Button,
  Layer,
  ScrollView,
  Typography,
  useNavigate,
} from '~/components/elemental';
import {useOnBoardUserInStripe} from './hook';
import useAuthStore from '~/stores/authStore';
import { useUpdateUser } from '../SelectRole/hook';
const appConfig = require('../../../../app.json');

const content = [
  {
    title: 'Information Collection:',
    description:
      'Explain what personal information you collect from sellers (e.g., name, contact details, payment information) and how its gathered (e.g., account creation, product listings).',
  },
  {
    title: 'Use of Information',
    description:
      'Describe how you use the sellers information, such as for order processing, communication, and improving services.',
  },
  {
    title: 'Data Sharing:',
    description:
      'Clarify if you share seller information with third parties (like payment processors or shipping companies) and for what purposes.',
  },
  {
    title: 'Security Measures:',
    description:
      'Detail the security measures in place to protect seller information from unauthorized access or misuse.',
  },
  {
    title: 'Access and Control: ',
    description:
      'Explain how sellers can access, update, or delete their personal information on the platform.',
  },
  {
    title: 'Cookies and Tracking:',
    description:
      'Disclose the use of cookies or tracking technologies on your platform and their purposes.',
  },
  {
    title: 'Policy Updates:',
    description:
      'Mention how and when you notify sellers about updates to the privacy policy.',
  },
];
const SellerPolicy = () => {
  const {navigateWithName} = useNavigate();
  const {mutate, isLoading} = useOnBoardUserInStripe();

  const deepLink = `${config?.baseURL}share?redirecturl=${String(
    appConfig?.name,
  ).toLocaleLowerCase()}://setting/seller`;

  const user = useAuthStore(state => state?.user);
  const setUser = useAuthStore(state => state?.setUser);

  const {mutate: mutateUpdateUser, isLoading:isLoadingUpdateuser } = useUpdateUser();

  const changeRole = async (role: 'seller' | 'buyer') => {
    const userInput = {
      userRole: role,
    };

    mutateUpdateUser(
      {userId: user?.id, userInput},
      {
        onSuccess(data) {
          setUser(data?.user_updateUser?.result);
          navigateWithName('InterestsScreen', {
            isFirst: true,
            multiSelect: true,
            entity: 'productCategories',
          });
        },
      },
    );
  };

  const OnBoardUserHandler = () => {
    mutate(
      {returnUrl: deepLink, refreshUrl: deepLink},
      {
        onSuccess(data) {
          if (
            data?.paymentStripe_onboardUserInStripeConnect?.result?.url === null
          ) {
            changeRole('seller');
          } else if (
            data?.paymentStripe_onboardUserInStripeConnect?.status
              ?.description === 'Already Exists'
          ) {
            changeRole('seller');
          } else if (
            data?.paymentStripe_onboardUserInStripeConnect?.result?.errors?.filter(
              i => i?.reason !== null,
            )?.[0]
          ) {
            Alert.alert(
              'Error',
              data?.paymentStripe_onboardUserInStripeConnect?.result?.errors?.filter(
                i => i?.reason !== null,
              )?.[0]?.reason,
              [
                {
                  text: 'Open Stripe',
                  onPress: () =>
                    Linking.openURL(
                      data?.paymentStripe_onboardUserInStripeConnect?.result
                        ?.url,
                    ),
                },
              ],
            );
          } else {
            Linking.openURL(
              data?.paymentStripe_onboardUserInStripeConnect?.result?.url,
            );
          }
        },
      },
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Layer style={styles.iconContainer}>
        <SellerPolicyIcon />
      </Layer>

      {content?.map((item, index) => (
        <Typography key={index}>
          <Typography style={styles.titleText}>
            {index + 1}- {item?.title}{' '}
          </Typography>
          <Typography style={styles.descriptionText}>
            {item?.description}
            {'\n'}
          </Typography>
        </Typography>
      ))}
      <Button
        isLoading={isLoading || isLoadingUpdateuser}
        style={styles.button}
        onPress={() => OnBoardUserHandler()}>
        Next
      </Button>
    </ScrollView>
  );
};

export default SellerPolicy;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    margin: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  button: {
    marginVertical: 16,
  },
});
