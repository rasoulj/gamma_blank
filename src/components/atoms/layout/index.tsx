import {useRoute} from '@react-navigation/native';
import React, {ReactNode, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Header, Screen, TabsNavigation, View} from '~/components/elemental';
import GuestMode from '~/components/molecules/GuestMode';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import {guestModelElements} from '~/utils/mustHaveGuestMode';
import {HeaderProps} from '../Header';

export type LayoutProps = {
  children: ReactNode;
  headless?: boolean;
  fullscreen?: boolean;
  isLoading?: boolean;
  navigation?: boolean;
  headerProps?: HeaderProps;
  hasBack?: boolean;
  hasMargin?: boolean;
  margin?: number;
};

function Layout({
  headless = false,
  fullscreen = false,
  isLoading = false,
  navigation = false,
  hasBack = true,
  children,
  headerProps = {},
  hasMargin = true,
  margin,
}: LayoutProps) {
  const token = useAuthStore(state => state?.token);
  const isUserLoggedIn = useAuthStore(state => state?.isUserLoggedIn);
  const route = useRoute();

  const freeZoneElements = [
    ...guestModelElements,
    'SettingsScreen',
    'SupportScreen',
    'TermsConditionsScreen',
    'ItemSearchScreen',
  ];

  const checkFreeZone = useMemo(() => {
    return freeZoneElements.includes(route?.name);
  }, []);

  return (
    <Screen isLoading={isLoading} style={{}}>
      {fullscreen ? (
        children
      ) : (
        <>
          {!headless && <Header {...headerProps} />}
          <View
            style={
              hasMargin && margin != 0
                ? [
                    styles.RelativeLayout,
                    {
                      marginHorizontal: margin ?? 20,
                      marginVertical: margin ?? 10,
                    },
                  ]
                : styles.containerMargin
            }>
            {token || !isUserLoggedIn || checkFreeZone ? (
              children
            ) : (
              <GuestMode />
            )}
          </View>
          {navigation && (
            <View style={{height: 65}}>
              <TabsNavigation
                style={styles.TabsNavigation}
                paths={model?.metaData?.configs?.tabsNavigation?.paths}
              />
            </View>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  RelativeLayout: {
    flexDirection: 'column',
    minHeight: 50,
    flex: 1,
    padding: 0,
    gap: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  containerMargin: {
    flexDirection: 'column',
    minHeight: 50,
    flex: 1,
    padding: 0,
  },
  TabsNavigation: {left: 0, right: 0, bottom: 0, zIndex: 10, height: 65},
});

export default Layout;
