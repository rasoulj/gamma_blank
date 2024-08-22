import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Button,
  Layer,
  Screen,
  Typography,
  useNavigate,
} from '~/components/elemental';
import {useUpdateUser} from './hook';
import useAuthStore from '~/stores/authStore';
import EducationSelectRole from '../EducationSelectRole';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import {model} from '~/data/model';
import useHeader from '~/components/elemental/hooks/use_header';

const selectRoleConfig = model?.metaData?.configs?.selectRole;

const SelectRole = () => {
  const {navigateWithName} = useNavigate();

  const {mutate, isLoading} = useUpdateUser();
  const user = useAuthStore(state => state?.user);
  const setUser = useAuthStore(state => state?.setUser);

  const {} = useHeader({
    hidden: true,
    hasBack: false,
  });
  const changeRole = (role: 'seller' | 'buyer') => {
    const userInput = {
      userRole: role,
    };
    mutate(
      {userId: user?.id, userInput},
      {
        onSuccess(data) {
          setUser(data?.user_updateUser?.result);
          if (data?.user_updateUser?.result?.userRole === 'seller') {
            navigateWithName('Seller');
          } else {
            navigateWithName('InterestsScreen', {
              isFirst: true,
              multiSelect: true,
              entity: 'productCategories',
            });
          }
        },
      },
    );
  };
  return isElementInModel('EducationHome') ? (
    <EducationSelectRole />
  ) : (
    <Screen isLoading={isLoading}>
      <Layer style={styles.view}>
        <Typography style={styles.roleTitle}>
          Do you wanna be a Seller too?
        </Typography>
        <Typography style={styles.roleText}>
          Choose your role to continue.
        </Typography>
      </Layer>
      {selectRoleConfig?.seller !== false && (
        <Button onPress={() => changeRole('seller')}>
          Yes I want to be a Seller
        </Button>
      )}
      <Button
        variant={'outline'}
        style={styles.btn}
        onPress={() => changeRole('buyer')}>
        No
      </Button>
    </Screen>
  );
};

export default SelectRole;

const styles = StyleSheet.create({
  btn: {marginTop: 16, borderWidth: 2, marginBottom: 8},

  roleText: {fontSize: 16, fontWeight: '400', marginTop: 8},

  roleTitle: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },

  view: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
