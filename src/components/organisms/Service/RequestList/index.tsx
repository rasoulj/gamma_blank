import React from 'react';
import {StyleSheet} from 'react-native';

import {Tabs, useNavigate} from '~/components/elemental';
import RequestContractorList from './RequestContractorList';
import RequestCustomerList from './RequestCustomerList';
import RequestUpcomingList from './RequestUpcomingList';
import RequestPastList from './RequestPastList';

const RequestList = ({type = 'IN_PERSON'}: {type?: 'IN_PERSON' | 'ONLINE'}) => {
  const {navigateWithName} = useNavigate();

  const tabs = [
    {
      id: 'Customer',
      label: 'Customer',
      component: <RequestCustomerList navigateWithName={navigateWithName} />,
    },
    {
      id: 'Contractor',
      label: 'Contractor',
      component: <RequestContractorList navigateWithName={navigateWithName} />,
    },
  ];

  const online_market_place_tabs = [
    {
      id: 'Upcoming',
      label: 'Upcoming',
      component: <RequestUpcomingList navigateWithName={navigateWithName} />,
    },
    {
      id: 'Past',
      label: 'Past',
      component: <RequestPastList navigateWithName={navigateWithName} />,
    },
  ];

  return (
    <>
      <Tabs
        activeTab={type === 'IN_PERSON' ? 'Customer' : 'Upcoming'}
        tabs={type === 'IN_PERSON' ? tabs : online_market_place_tabs}
        style={{}}
      />
    </>
  );
};

export default RequestList;

const styles = StyleSheet.create({});
