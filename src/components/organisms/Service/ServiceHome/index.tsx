import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  AddIconSet,
  Header,
  Typography,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {useGetServices} from '../hook';
import ServiceList from '../ServiceList';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';

const ServiceHome = ({
  headerComponent,
  type = 'IN_PERSON',
}: {
  headerComponent?: any;
  type?: 'IN_PERSON' | 'ONLINE';
}) => {
  const {navigateWithName} = useNavigate();

  return (
    <>
      <Header
        title="My services"
        style={{marginHorizontal: 0}}
        hasBack={'false'}>
        <TouchableOpacity onPress={() => navigateWithName('create service')}>
          <AddIconSet />
        </TouchableOpacity>
      </Header>
      <ServiceList type={type} />
    </>
  );
};

export default ServiceHome;

const styles = StyleSheet.create({});
