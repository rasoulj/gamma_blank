import React from 'react';
import {
  Box,
  Card,
  Header,
  HStack,
  InfiniteScroll,
  relativeTime,
  Screen,
  Tabs,
  Typography,
  useNavigate,
  VStack,
} from '../../elemental';
import useAuthStore from '~/stores/authStore';
import CurrentOrderHistory from './CurrentOrderHistory';
import PastOrderHistory from './PastOrderHistory';
import MyPurchaseOrderHistory from './MyPurchaseOrderHistory';
import MySellsOrderHistory from './MySellsOrderHistory';

export default function OrderHistory() {
  const {user} = useAuthStore();
  const {navigateWithName} = useNavigate();

  const tabs = [
    {
      id: 'Current',
      label: 'Current',
      component: <CurrentOrderHistory navigateWithName={navigateWithName} />,
    },
    {
      id: 'Past',
      label: 'Past',
      component: <PastOrderHistory navigateWithName={navigateWithName} />,
    },
  ];

  const sellerTabs = [
    {
      id: 'Current',
      label: 'My Purchase',
      component: <MyPurchaseOrderHistory navigateWithName={navigateWithName} />,
    },
    {
      id: 'Past',
      label: 'My Sells',
      component: <MySellsOrderHistory navigateWithName={navigateWithName} />,
    },
  ];
  return (
    <Screen>
      <Tabs
        tabs={user?.userRole === 'seller' ? sellerTabs : tabs}
        activeTab="Current"
      />
    </Screen>
  );
}
